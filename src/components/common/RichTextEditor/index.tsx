import React, { useMemo, useRef, useState } from "react";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
  type LexicalEditor,
  type LexicalNode,
} from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $wrapNodes } from "@lexical/selection";
import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { sanitizeHtml, stripHtml } from "../../../utils/html";
import { $createSpoilerNode, $isSpoilerNode, SpoilerNode } from "./nodes/SpoilerNode";
import * as S from "./styles";

interface RichTextEditorProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  minHeight?: string;
}

interface ToolbarButtonConfig {
  label: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const editorTheme = {
  heading: {
    h1: "rich-text-heading-h1",
    h2: "rich-text-heading-h2",
  },
  list: {
    listitem: "rich-text-list-item",
    ol: "rich-text-list-ol",
    ul: "rich-text-list-ul",
  },
  paragraph: "rich-text-paragraph",
  spoiler: "rich-text-spoiler",
  text: {
    bold: "rich-text-bold",
    italic: "rich-text-italic",
  },
};

const normalizeEditorHtml = (html: string) => {
  const safeHtml = sanitizeHtml(html).trim();

  if (!safeHtml) {
    return "";
  }

  return stripHtml(safeHtml) ? safeHtml : "";
};

const loadHtmlIntoEditor = (editor: LexicalEditor, html: string) => {
  editor.update(() => {
    const root = $getRoot();
    root.clear();

    if (!html.trim()) {
      root.append($createParagraphNode());
      return;
    }

    const parser = new DOMParser();
    const documentFragment = parser.parseFromString(html, "text/html");
    const importedNodes = $generateNodesFromDOM(editor, documentFragment);

    if (importedNodes.length === 0) {
      root.append($createParagraphNode());
      return;
    }

    importedNodes.forEach((node: LexicalNode) => {
      if ($isTextNode(node)) {
        const paragraph = $createParagraphNode();
        paragraph.append(node);
        root.append(paragraph);
        return;
      }

      root.append(node);
    });
  });
};

const HtmlSyncPlugin: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const [editor] = useLexicalComposerContext();
  const lastSerializedValueRef = useRef<string | null>(null);

  React.useEffect(() => {
    const normalizedValue = normalizeEditorHtml(value);

    if (normalizedValue === lastSerializedValueRef.current) {
      return;
    }

    loadHtmlIntoEditor(editor, normalizedValue);
    lastSerializedValueRef.current = normalizedValue;
  }, [editor, value]);

  return (
    <OnChangePlugin
      ignoreHistoryMergeTagChange
      ignoreSelectionChange
      onChange={(editorState, nextEditor) => {
        editorState.read(() => {
          const exportedHtml = normalizeEditorHtml(
            $generateHtmlFromNodes(nextEditor, null),
          );

          if (exportedHtml === lastSerializedValueRef.current) {
            return;
          }

          lastSerializedValueRef.current = exportedHtml;
          onChange(exportedHtml);
        });
      }}
    />
  );
};

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [blockType, setBlockType] = useState<"ul" | "ol" | null>(null);

  React.useEffect(() => {
    const updateToolbar = () => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection)) {
        return;
      }

      const anchorNode = selection.anchor.getNode();
      const listNode = $getNearestNodeOfType(anchorNode, ListNode);

      if (listNode) {
        setBlockType(listNode.getListType() === "number" ? "ol" : "ul");
      } else {
        setBlockType(null);
      }

      const spoilerNode = $findMatchingParent(
        anchorNode,
        (parentNode) => $isSpoilerNode(parentNode),
      );

      setIsSpoiler(Boolean(spoilerNode));
    };

    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor]);

  const toggleList = (listType: "ul" | "ol") => {
    if (blockType === listType) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      return;
    }

    editor.dispatchCommand(
      listType === "ul"
        ? INSERT_UNORDERED_LIST_COMMAND
        : INSERT_ORDERED_LIST_COMMAND,
      undefined,
    );
  };

  const toggleSpoiler = () => {
    editor.update(() => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection)) {
        return;
      }

      const selectedNodes = selection.getNodes();

      if (selectedNodes.length === 0) {
        return;
      }

      const spoilerParents = selectedNodes
        .map((node) =>
          $findMatchingParent(node, (parentNode) => $isSpoilerNode(parentNode)),
        )
        .filter((node): node is SpoilerNode => $isSpoilerNode(node));

      const uniqueSpoilerParents = Array.from(
        new Map(spoilerParents.map((node) => [node.getKey(), node])).values(),
      );

      const canUnwrapSelection =
        uniqueSpoilerParents.length === 1 &&
        selectedNodes.every((node) => {
          const spoilerNode = $findMatchingParent(
            node,
            (parentNode) => $isSpoilerNode(parentNode),
          );

          return spoilerNode?.getKey() === uniqueSpoilerParents[0].getKey();
        });

      if (canUnwrapSelection) {
        const spoilerNode = uniqueSpoilerParents[0];

        spoilerNode.getChildren().forEach((childNode) => {
          spoilerNode.insertBefore(childNode);
        });

        spoilerNode.remove();
        return;
      }

      if (selection.isCollapsed()) {
        return;
      }

      $wrapNodes(selection, () => $createSpoilerNode());
    });
  };

  const toolbarButtons: ToolbarButtonConfig[] = [
    {
      label: "UL",
      title: "Bullet list",
      isActive: blockType === "ul",
      onClick: () => toggleList("ul"),
    },
    {
      label: "OL",
      title: "Numbered list",
      isActive: blockType === "ol",
      onClick: () => toggleList("ol"),
    },
    {
      label: "SP",
      title: "Spoiler",
      isActive: isSpoiler,
      onClick: toggleSpoiler,
    },
  ];

  return (
    <S.Toolbar role="toolbar" aria-label="Publication formatting toolbar">
      {toolbarButtons.map((button) => (
        <S.ToolbarButton
          key={button.label}
          type="button"
          title={button.title}
          $isActive={button.isActive}
          onMouseDown={(event) => event.preventDefault()}
          onClick={button.onClick}
        >
          {button.label}
        </S.ToolbarButton>
      ))}
    </S.Toolbar>
  );
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  id,
  value,
  onChange,
  placeholder,
  minHeight = "220px",
}) => {
  const initialConfig = useMemo(
    () => ({
      namespace: `rich-text-editor-${id}`,
      nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, SpoilerNode],
      onError: (error: Error) => {
        throw error;
      },
      theme: editorTheme,
    }),
    [id],
  );

  return (
    <S.EditorShell>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />

        <S.HelperCard>
          <S.HelperTitle>Lexical publication editor</S.HelperTitle>
          <S.HelperText>
            We are rebuilding the formatting flow in stages. This pass keeps the
            spoiler logic and rebuilds list handling first.
          </S.HelperText>
          <S.HelperText>
            Use <code>UL</code> for bullet lists, <code>OL</code> for numbered
            lists, and <code>SP</code> for spoiler. The preview reads the same
            HTML generated by the editor.
          </S.HelperText>
        </S.HelperCard>

        <S.EditorFrame $minHeight={minHeight}>
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<S.EditorPlaceholder>{placeholder}</S.EditorPlaceholder>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </S.EditorFrame>

        <HistoryPlugin />
        <ListPlugin />
        <HtmlSyncPlugin value={value} onChange={onChange} />
      </LexicalComposer>
    </S.EditorShell>
  );
};

export default RichTextEditor;
