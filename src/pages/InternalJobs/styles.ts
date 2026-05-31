import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1100px;
`;

export const HeaderCard = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 221, 150, 0.14);
  background: rgba(10, 10, 10, 0.68);
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const PageSubtitle = styled.p`
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

export const InfoCard = styled.section`
  padding: 1.25rem 1.5rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 221, 150, 0.14);
  background: rgba(0, 0, 0, 0.36);
`;

export const InfoTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
`;

export const InfoText = styled.p`
  margin: 0.5rem 0 0;
  color: rgba(255, 244, 223, 0.76);
  line-height: 1.65;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const FormCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 221, 150, 0.14);
  background: rgba(10, 10, 10, 0.68);
`;

export const ListCard = styled(FormCard)``;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.4rem;
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
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

  &::placeholder {
    color: rgba(255, 244, 223, 0.4);
  }
`;

export const TextInput = styled.input`
  ${sharedInputStyles}
`;

export const TextArea = styled.textarea`
  ${sharedInputStyles}
  min-height: 180px;
  resize: vertical;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const ToggleField = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 1rem 1rem 0.95rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 221, 150, 0.14);
  background: rgba(0, 0, 0, 0.28);
  cursor: pointer;

  input {
    width: 1rem;
    height: 1rem;
    margin-top: 0.15rem;
    accent-color: var(--color-hover-purple);
    cursor: pointer;
  }

  span {
    display: block;
    color: #fff;
    font-size: 0.98rem;
  }

  small {
    display: block;
    margin-top: 0.3rem;
    color: rgba(255, 244, 223, 0.7);
    line-height: 1.6;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
`;

export const FieldError = styled.span`
  color: #ffb6b6;
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
  color: #fff;
  border: none;
  background: linear-gradient(135deg, rgba(167, 150, 255, 0.8), rgba(85, 55, 140, 1));
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

export const EmptyState = styled.p`
  margin: 0;
  color: rgba(255, 244, 223, 0.74);
  line-height: 1.7;
`;

export const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 860px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const JobCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.15rem 1.2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 221, 150, 0.12);
  background: rgba(0, 0, 0, 0.34);
  min-width: 0;
`;

export const JobCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const JobMetaBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const CardActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (min-width: 640px) {
    justify-content: flex-end;
  }
`;

export const JobStatus = styled.span<{ $isActive: boolean }>`
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? "rgba(255, 221, 150, 0.3)" : "rgba(255, 124, 124, 0.35)"};
  background:
    ${({ $isActive }) =>
      $isActive ? "rgba(167, 150, 255, 0.14)" : "rgba(88, 14, 14, 0.28)"};
  color: ${({ $isActive }) => ($isActive ? "#fff2d2" : "#ffd9d9")};
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const JobDate = styled.span`
  color: rgba(255, 244, 223, 0.64);
  font-size: 0.85rem;
`;

export const JobTitle = styled.h3`
  margin: 0;
  font-size: 1.18rem;
  color: #fff;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const JobDescription = styled.p`
  margin: 0;
  color: rgba(255, 244, 223, 0.76);
  line-height: 1.7;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const JobFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: auto;
`;

export const InlineEditorShell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.15rem 0 0.1rem;
`;
