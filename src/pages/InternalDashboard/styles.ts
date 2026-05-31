import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1180px;
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
  background:
    radial-gradient(circle at top left, rgba(167, 150, 255, 0.14), transparent 44%),
    rgba(10, 10, 10, 0.72);
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.9rem, 3vw, 2.7rem);
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const PageSubtitle = styled.p`
  margin: 0.5rem 0 0;
  max-width: 720px;
  color: rgba(255, 244, 223, 0.76);
  line-height: 1.75;
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

export const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 860px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const HighlightCard = styled.section`
  padding: 1.35rem 1.45rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 221, 150, 0.14);
  background: rgba(0, 0, 0, 0.36);
`;

export const HighlightEyebrow = styled.span`
  display: inline-block;
  color: rgba(255, 244, 223, 0.62);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const HighlightTitle = styled.h2`
  margin: 0.45rem 0 0;
  font-size: 1.45rem;
  color: #fff;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const HighlightText = styled.p`
  margin: 0.65rem 0 0;
  color: rgba(255, 244, 223, 0.78);
  line-height: 1.72;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 620px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1080px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const MetricCard = styled.section`
  padding: 1.2rem 1.25rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 221, 150, 0.12);
  background: rgba(0, 0, 0, 0.3);
  min-width: 0;
`;

export const MetricLabel = styled.span`
  display: inline-block;
  color: rgba(255, 244, 223, 0.62);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const MetricValue = styled.div`
  margin-top: 0.55rem;
  color: #fff;
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  line-height: 1.1;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const MetricHelp = styled.p`
  margin: 0.65rem 0 0;
  color: rgba(255, 244, 223, 0.72);
  line-height: 1.65;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const SectionCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.45rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 221, 150, 0.14);
  background: rgba(10, 10, 10, 0.68);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.35rem;
`;

export const SectionDescription = styled.p`
  margin: 0.45rem 0 0;
  color: rgba(255, 244, 223, 0.74);
  line-height: 1.7;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 860px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const FormField = styled.div`
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

export const FieldError = styled.span`
  color: #ffb6b6;
  font-size: 0.84rem;
`;

export const HelperText = styled.span`
  color: rgba(255, 244, 223, 0.66);
  font-size: 0.84rem;
  line-height: 1.6;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const FormActions = styled.div`
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
  background: linear-gradient(135deg, rgba(167, 150, 255, 0.8), rgba(85, 55, 140, 1));
`;

export const SecondaryButton = styled.button`
  ${sharedButtonStyles}
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 221, 150, 0.26);
  color: var(--color-text-light);
`;

export const HealthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.85rem;

  @media (min-width: 680px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1080px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const HealthItem = styled.div`
  min-width: 0;
  padding: 1rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 221, 150, 0.1);
  background: rgba(0, 0, 0, 0.26);
`;

export const HealthValue = styled.div`
  margin-top: 0.45rem;
  color: #fff;
  font-size: clamp(1rem, 1.7vw, 1.18rem);
  line-height: 1.3;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const StatusPill = styled.span<{ $status: "ok" | "error" | "checking" }>`
  align-self: flex-start;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $status }) =>
      $status === "ok"
        ? "rgba(112, 255, 176, 0.32)"
        : $status === "error"
          ? "rgba(255, 92, 92, 0.48)"
          : "rgba(255, 221, 150, 0.26)"};
  background:
    ${({ $status }) =>
      $status === "ok"
        ? "rgba(31, 104, 62, 0.22)"
        : $status === "error"
          ? "rgba(88, 14, 14, 0.34)"
          : "rgba(0, 0, 0, 0.32)"};
  color:
    ${({ $status }) =>
      $status === "ok"
        ? "#bdfbd5"
        : $status === "error"
          ? "#ffd9d9"
          : "rgba(255, 244, 223, 0.88)"};
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 860px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const sharedActionCardStyles = `
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-width: 0;
  padding: 1.2rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 221, 150, 0.12);
  background: rgba(0, 0, 0, 0.34);
`;

export const ActionCard = styled(Link)`
  ${sharedActionCardStyles}
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(167, 150, 255, 0.34);
    background: rgba(24, 16, 44, 0.4);
  }
`;

export const RestrictionCard = styled.div`
  ${sharedActionCardStyles}
`;

export const ActionEyebrow = styled.span`
  display: inline-block;
  color: rgba(255, 244, 223, 0.62);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const ActionTitle = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 1.15rem;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const ActionDescription = styled.p`
  margin: 0;
  color: rgba(255, 244, 223, 0.76);
  line-height: 1.7;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const ActionCta = styled.span`
  margin-top: auto;
  color: var(--color-hover-purple);
  font-size: 0.94rem;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  }
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

export const EmptyState = styled.p`
  margin: 0;
  color: rgba(255, 244, 223, 0.74);
  line-height: 1.7;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
`;

export const ListItem = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  min-width: 0;
  padding: 1.05rem 1.1rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 221, 150, 0.1);
  background: rgba(0, 0, 0, 0.28);
`;

export const ListMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const TypeBadge = styled.span`
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(167, 150, 255, 0.14);
  border: 1px solid rgba(255, 221, 150, 0.28);
  color: var(--color-primary-text);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const JobStatus = styled.span<{ $isActive: boolean }>`
  padding: 0.35rem 0.75rem;
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

export const MetaText = styled.span`
  color: rgba(255, 244, 223, 0.64);
  font-size: 0.85rem;
`;

export const ListTitle = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 1.05rem;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const ListDescription = styled.p`
  margin: 0;
  color: rgba(255, 244, 223, 0.76);
  line-height: 1.7;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const ListLink = styled(Link)`
  color: var(--color-hover-purple);
  text-decoration: none;
  font-size: 0.92rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const FilterCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-width: 0;
  padding: 1rem 1.05rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 221, 150, 0.1);
  background: rgba(0, 0, 0, 0.26);
`;
