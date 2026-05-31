import {
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type EditorConfig,
  ElementNode,
  type LexicalNode,
  type SerializedElementNode,
  type Spread,
} from "lexical";

export type SerializedSpoilerNode = Spread<
  {
    type: "spoiler";
    version: 1;
  },
  SerializedElementNode
>;

const convertSpoilerElement = (): DOMConversionOutput => ({
  node: $createSpoilerNode(),
});

export class SpoilerNode extends ElementNode {
  static getType(): string {
    return "spoiler";
  }

  static clone(node: SpoilerNode): SpoilerNode {
    return new SpoilerNode(node.__key);
  }

  static importJSON(_: SerializedSpoilerNode): SpoilerNode {
    return $createSpoilerNode();
  }

  static importDOM(): DOMConversionMap | null {
    return {
      spoiler: () => ({
        conversion: convertSpoilerElement,
        priority: 2,
      }),
      span: (domNode: HTMLElement) =>
        domNode.dataset.spoiler === "true"
          ? {
              conversion: convertSpoilerElement,
              priority: 2,
            }
          : null,
    };
  }

  exportJSON(): SerializedSpoilerNode {
    return {
      ...super.exportJSON(),
      type: "spoiler",
      version: 1,
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement("span");
    const themeClassName = config.theme.spoiler;

    if (themeClassName) {
      dom.className = themeClassName;
    }

    dom.dataset.lexicalSpoiler = "true";
    return dom;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("spoiler");
    return { element };
  }

  updateDOM(): boolean {
    return false;
  }

  isInline(): boolean {
    return true;
  }

  canBeEmpty(): boolean {
    return false;
  }

  canInsertTextBefore(): boolean {
    return true;
  }

  canInsertTextAfter(): boolean {
    return true;
  }
}

export const $createSpoilerNode = (): SpoilerNode => new SpoilerNode();

export const $isSpoilerNode = (
  node: LexicalNode | null | undefined,
): node is SpoilerNode => node instanceof SpoilerNode;
