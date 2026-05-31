import styled from "styled-components";

export const EditorShell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
`;

export const ToolbarButton = styled.button<{ $isActive: boolean }>`
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? "var(--color-primary-text)" : "rgba(255, 221, 150, 0.2)"};
  border-radius: 10px;
  padding: 0.55rem 0.8rem;
  background:
    ${({ $isActive }) =>
      $isActive
        ? "linear-gradient(135deg, rgba(167, 150, 255, 0.25), rgba(0, 0, 0, 0.42))"
        : "rgba(0, 0, 0, 0.3)"};
  color:
    ${({ $isActive }) =>
      $isActive ? "var(--color-primary-text)" : "var(--color-text-light)"};
  font-family: var(--font-primary);
  font-size: 0.88rem;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: var(--color-hover-purple);
    color: var(--color-primary-text);
    transform: translateY(-1px);
    background: rgba(167, 150, 255, 0.1);
  }
`;

export const HelperCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.95rem 1rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 221, 150, 0.14);
  background: rgba(0, 0, 0, 0.28);

  code {
    color: var(--color-primary-text);
    font-family: Consolas, "Courier New", monospace;
    font-size: 0.92em;
  }
`;

export const HelperTitle = styled.span`
  color: #fff;
  font-size: 0.94rem;
  font-weight: 600;
`;

export const HelperText = styled.p`
  margin: 0;
  color: rgba(255, 244, 223, 0.74);
  line-height: 1.65;
  font-size: 0.92rem;
`;

export const EditorFrame = styled.div<{
  $minHeight: string;
}>`
  position: relative;
  min-height: ${({ $minHeight }) => $minHeight};
  border-radius: 16px;
  border: 1px solid rgba(255, 221, 150, 0.16);
  background: rgba(0, 0, 0, 0.45);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: var(--color-hover-purple);
    box-shadow: 0 0 0 3px rgba(167, 150, 255, 0.14);
  }

  .editor-input {
    min-height: ${({ $minHeight }) => $minHeight};
    padding: 1rem;
    color: #fff;
    font-family: var(--font-primary);
    font-size: 1rem;
    line-height: 1.75;
    outline: none;
  }

  .editor-input p,
  .editor-input ul,
  .editor-input ol,
  .editor-input blockquote {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .editor-input h1,
  .editor-input h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--color-primary-text);
    line-height: 1.2;
  }

  .editor-input h1 {
    font-size: 1.9rem;
  }

  .editor-input h2 {
    font-size: 1.45rem;
  }

  .editor-input ul,
  .editor-input ol {
    margin: 0 0 1rem;
    padding-left: 1.5rem;
    list-style-position: outside;
  }

  .editor-input .rich-text-list-ul {
    list-style-type: disc;
  }

  .editor-input .rich-text-list-ol {
    list-style-type: decimal;
  }

  .editor-input .rich-text-list-item {
    margin-bottom: 0.4rem;
    padding-left: 0.05rem;
  }

  .editor-input .rich-text-list-item::marker {
    color: rgba(255, 244, 223, 0.88);
    font-weight: 700;
  }

  .editor-input .rich-text-spoiler {
    display: inline;
    padding: 0.05rem 0.3rem;
    border-radius: 0.35rem;
    background: linear-gradient(
      135deg,
      rgba(167, 150, 255, 0.22),
      rgba(255, 221, 150, 0.14)
    );
    color: #fff;
    box-shadow: inset 0 0 0 1px rgba(255, 221, 150, 0.18);
  }
`;

export const EditorPlaceholder = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  color: rgba(255, 244, 223, 0.38);
  pointer-events: none;
  line-height: 1.75;
`;
