import { Link } from "react-router-dom";
import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const HeaderRow = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const PageSubtitle = styled.p`
  max-width: 760px;
  margin: 0.5rem 0 0;
  color: rgba(255, 244, 223, 0.76);
  line-height: 1.7;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const RoleChip = styled.span`
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  background: rgba(167, 150, 255, 0.14);
  border: 1px solid rgba(255, 221, 150, 0.28);
  color: var(--color-primary-text);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const SectionCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 221, 150, 0.14);
  background: rgba(10, 10, 10, 0.68);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.4rem;
`;

export const SectionDescription = styled.p`
  margin: 0.4rem 0 0;
  color: rgba(255, 244, 223, 0.7);
  line-height: 1.65;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const StatusBox = styled.div<{ $isError?: boolean }>`
  padding: 1rem 1.1rem;
  border-radius: 14px;
  border: 1px solid
    ${({ $isError }) =>
      $isError ? "rgba(255, 92, 92, 0.5)" : "rgba(255, 221, 150, 0.2)"};
  background:
    ${({ $isError }) =>
      $isError ? "rgba(88, 14, 14, 0.35)" : "rgba(0, 0, 0, 0.42)"};
  color:
    ${({ $isError }) =>
      $isError ? "#ffd9d9" : "rgba(255, 244, 223, 0.92)"};
  line-height: 1.6;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 860px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;

  label {
    color: var(--color-text-light);
    font-size: 0.92rem;
  }
`;

const sharedInputStyles = `
  width: 100%;
  min-width: 0;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 221, 150, 0.16);
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-family: var(--font-primary);
  font-size: 1rem;
  line-height: 1.6;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-hover-purple);
    box-shadow: 0 0 0 3px rgba(167, 150, 255, 0.14);
  }
`;

export const TextInput = styled.input`
  ${sharedInputStyles}
`;

export const SelectInput = styled.select`
  ${sharedInputStyles}
`;

export const TextArea = styled.textarea`
  ${sharedInputStyles}
  resize: vertical;
  min-height: 140px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const CompactTextArea = styled(TextArea)`
  min-height: 54px;
  resize: none;
  overflow: hidden;
`;

export const FileInput = styled.input`
  ${sharedInputStyles}
  padding: 0.75rem;
`;

export const HelperText = styled.span`
  color: rgba(255, 244, 223, 0.62);
  font-size: 0.84rem;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const FieldError = styled.span`
  color: #ffb6b6;
  font-size: 0.84rem;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const TagItem = styled.span`
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(167, 150, 255, 0.16);
  color: var(--color-text-light);
  font-size: 0.82rem;
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ImageSectionTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  color: var(--color-primary-text);
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.9rem;
`;

export const ImageCard = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid rgba(255, 221, 150, 0.14);
  background: rgba(0, 0, 0, 0.42);
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
`;

export const ImageFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem;
  color: rgba(255, 244, 223, 0.72);
  font-size: 0.84rem;
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const sharedButtonStyles = `
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0.8rem 1.1rem;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 0.95rem;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const PrimaryButton = styled.button`
  ${sharedButtonStyles}
  background: linear-gradient(135deg, rgba(167, 150, 255, 0.8), rgba(85, 55, 140, 1));
  color: #fff;
`;

export const SecondaryButton = styled.button`
  ${sharedButtonStyles}
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 221, 150, 0.26);
  color: var(--color-text-light);
`;

export const DangerButton = styled.button`
  ${sharedButtonStyles}
  background: rgba(120, 22, 22, 0.24);
  border-color: rgba(255, 92, 92, 0.35);
  color: #ffd7d7;
`;

export const GhostDangerButton = styled.button`
  ${sharedButtonStyles}
  padding: 0.45rem 0.7rem;
  background: transparent;
  border-color: rgba(255, 92, 92, 0.35);
  color: #ffd7d7;
  font-size: 0.82rem;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
`;

export const FilterButton = styled.button<{ $isActive: boolean }>`
  ${sharedButtonStyles}
  padding: 0.65rem 0.95rem;
  border-radius: 999px;
  border-color:
    ${({ $isActive }) =>
      $isActive ? "var(--color-primary-text)" : "rgba(255, 221, 150, 0.24)"};
  background:
    ${({ $isActive }) =>
      $isActive
        ? "linear-gradient(135deg, rgba(167, 150, 255, 0.28), rgba(0, 0, 0, 0.68))"
        : "rgba(0, 0, 0, 0.24)"};
  color:
    ${({ $isActive }) =>
      $isActive ? "var(--color-primary-text)" : "var(--color-text-light)"};
`;

export const PublicationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const PublicationCard = styled.article`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(255, 221, 150, 0.14);
  background: rgba(0, 0, 0, 0.34);
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
`;

export const CardImagePlaceholder = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background:
    linear-gradient(135deg, rgba(167, 150, 255, 0.22), rgba(0, 0, 0, 0.8)),
    radial-gradient(circle at top, rgba(255, 221, 150, 0.16), transparent 55%);
  color: var(--color-primary-text);
  font-family: var(--font-heading);
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.2rem;
`;

export const CardMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const TypeBadge = styled.span`
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  background: rgba(167, 150, 255, 0.14);
  color: var(--color-primary-text);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const MetaText = styled.span`
  color: rgba(255, 244, 223, 0.66);
  font-size: 0.84rem;
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1.35;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const CardSummary = styled.p`
  margin: 0;
  color: rgba(255, 244, 223, 0.78);
  line-height: 1.65;
  overflow-wrap: anywhere;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardActions = styled.div`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
`;

export const PreviewLink = styled(Link)`
  ${sharedButtonStyles}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.28);
  border-color: rgba(255, 221, 150, 0.24);
  color: var(--color-primary-text);
  text-decoration: none;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

export const PageButton = styled.button<{ $isActive: boolean }>`
  ${sharedButtonStyles}
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 12px;
  border-color:
    ${({ $isActive }) =>
      $isActive ? "var(--color-primary-text)" : "rgba(255, 221, 150, 0.24)"};
  background:
    ${({ $isActive }) =>
      $isActive
        ? "linear-gradient(135deg, rgba(167, 150, 255, 0.7), rgba(75, 45, 122, 1))"
        : "rgba(0, 0, 0, 0.32)"};
  color:
    ${({ $isActive }) =>
      $isActive ? "var(--color-primary-text)" : "var(--color-text-light)"};
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const ImageManagerShell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const UploadDropZone = styled.div<{ $isDragging: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem;
  border-radius: 18px;
  border: 1px dashed
    ${({ $isDragging }) =>
      $isDragging ? "var(--color-hover-purple)" : "rgba(255, 221, 150, 0.24)"};
  background:
    ${({ $isDragging }) =>
      $isDragging
        ? "linear-gradient(135deg, rgba(167, 150, 255, 0.16), rgba(0, 0, 0, 0.5))"
        : "rgba(0, 0, 0, 0.28)"};
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--color-hover-purple);
  }
`;

export const UploadTitle = styled.span`
  color: var(--color-primary-text);
  font-size: 1rem;
  font-weight: 600;
`;

export const UploadHint = styled.span`
  color: rgba(255, 244, 223, 0.74);
  line-height: 1.6;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const UploadCounter = styled.span`
  color: rgba(255, 244, 223, 0.58);
  font-size: 0.84rem;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const ImageMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ImageBadge = styled.span<{ $variant?: "pending" }>`
  align-self: flex-start;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background:
    ${({ $variant }) =>
      $variant === "pending"
        ? "rgba(167, 150, 255, 0.18)"
        : "rgba(255, 221, 150, 0.18)"};
  color:
    ${({ $variant }) =>
      $variant === "pending"
        ? "var(--color-hover-purple)"
        : "var(--color-primary-text)"};
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const EmptyPreviewState = styled.div`
  padding: 1rem 1.1rem;
  border-radius: 16px;
  border: 1px dashed rgba(255, 221, 150, 0.18);
  color: rgba(255, 244, 223, 0.72);
  line-height: 1.7;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const PreviewWorkspace = styled.div`
  position: relative;
  padding-top: 1rem;
`;

export const PreviewFloatingActions = styled.div`
  position: sticky;
  top: 1rem;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const PreviewCanvas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1rem;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(8, 8, 8, 0.8), rgba(18, 12, 30, 0.58));
  border: 1px solid rgba(255, 221, 150, 0.12);
`;

const previewCardStyles = `
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.75rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 221, 150, 0.14);
  background: rgba(8, 8, 8, 0.78);
  backdrop-filter: blur(10px);
`;

export const PreviewHeaderCard = styled.section`
  ${previewCardStyles}
`;

export const PreviewImageCard = styled.section`
  ${previewCardStyles}
`;

export const PreviewContentCard = styled.section`
  ${previewCardStyles}
`;

export const PreviewSectionToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const PreviewSectionLabel = styled.span`
  color: rgba(255, 244, 223, 0.6);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const PreviewTitle = styled.h2`
  margin: 0;
  color: #fff;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.2;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

const richTextStyles = `
  color: rgba(255, 244, 223, 0.9);
  line-height: 1.85;
  overflow-wrap: anywhere;
  word-break: break-word;

  h1,
  h2,
  h3,
  h4 {
    margin-top: 1.75rem;
    margin-bottom: 1rem;
    color: var(--color-primary-text);
  }

  p,
  ul,
  ol,
  blockquote,
  pre {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ul,
  ol {
    padding-left: 1.5rem;
    list-style-position: outside;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin-bottom: 0.4rem;
    padding-left: 0.05rem;
  }

  li::marker {
    color: rgba(255, 244, 223, 0.88);
    font-weight: 700;
  }

  a {
    color: var(--color-hover-purple);
  }

  blockquote {
    padding-left: 1rem;
    border-left: 3px solid rgba(167, 150, 255, 0.4);
    color: rgba(255, 244, 223, 0.78);
  }

  [data-spoiler="true"] {
    padding: 0.05rem 0.28rem;
    border-radius: 0.35rem;
    background: linear-gradient(
      135deg,
      rgba(167, 150, 255, 0.34),
      rgba(255, 221, 150, 0.18)
    );
    color: transparent;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px rgba(255, 221, 150, 0.18);
    transition:
      color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  [data-spoiler="true"]:hover,
  [data-spoiler="true"]:focus,
  [data-spoiler="true"][data-revealed="true"] {
    color: #fff;
    background: rgba(167, 150, 255, 0.2);
    box-shadow: inset 0 0 0 1px rgba(255, 221, 150, 0.3);
  }
`;

export const PreviewSummaryRichText = styled.div`
  ${richTextStyles}
  font-size: 1.02rem;
`;

export const PreviewRichText = styled.div`
  ${richTextStyles}
  font-size: 1rem;
`;

export const PreviewAuthorLine = styled.p`
  margin: 0;
  color: rgba(255, 244, 223, 0.62);
  font-size: 0.9rem;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const PreviewFeaturedImage = styled.img`
  width: 100%;
  max-height: 520px;
  border-radius: 20px;
  object-fit: cover;
  border: 1px solid rgba(255, 221, 150, 0.14);
`;

export const PreviewGalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

export const PreviewGalleryImage = styled.img`
  width: 100%;
  min-height: 180px;
  border-radius: 18px;
  object-fit: cover;
  border: 1px solid rgba(255, 221, 150, 0.14);
`;

export const PreviewInlineEditor = styled.div`
  margin-top: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 18px;
  border: 1px solid rgba(167, 150, 255, 0.18);
  background: rgba(0, 0, 0, 0.34);
`;
