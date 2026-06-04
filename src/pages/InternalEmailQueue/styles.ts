import styled from "styled-components";

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
  max-width: 760px;
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
  min-width: 0;
  padding: 1.2rem 1.25rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 221, 150, 0.12);
  background: rgba(0, 0, 0, 0.3);
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
  font-size: clamp(1.55rem, 3vw, 2.1rem);
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

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 760px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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

export const Select = styled.select`
  ${sharedInputStyles}
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

export const DangerButton = styled.button`
  ${sharedButtonStyles}
  background: rgba(120, 22, 22, 0.24);
  border-color: rgba(255, 92, 92, 0.35);
  color: #ffd7d7;
`;

export const QueueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
`;

export const QueueCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-width: 0;
  padding: 1.1rem 1.15rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 221, 150, 0.1);
  background: rgba(0, 0, 0, 0.3);
`;

export const QueueCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
`;

export const QueueSubject = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 1.08rem;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.75rem;

  @media (min-width: 760px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const DetailItem = styled.div`
  min-width: 0;
  padding: 0.8rem 0.85rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 221, 150, 0.09);
  background: rgba(0, 0, 0, 0.24);
`;

export const DetailLabel = styled.span`
  display: block;
  color: rgba(255, 244, 223, 0.58);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const DetailValue = styled.span`
  display: block;
  margin-top: 0.35rem;
  color: rgba(255, 244, 223, 0.88);
  line-height: 1.55;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const ErrorText = styled.p`
  margin: 0;
  color: #ffd1d1;
  line-height: 1.65;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const EmptyState = styled.p`
  margin: 0;
  color: rgba(255, 244, 223, 0.74);
  line-height: 1.7;
`;

export const PaginationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const PaginationText = styled.span`
  color: rgba(255, 244, 223, 0.7);
  font-size: 0.9rem;
`;

export const StatusPill = styled.span<{
  $status: "pending" | "processing" | "sent" | "failed" | "retrying" | "cancelled";
}>`
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $status }) => {
      if ($status === "sent") {
        return "rgba(112, 255, 176, 0.32)";
      }

      if ($status === "failed") {
        return "rgba(255, 92, 92, 0.48)";
      }

      if ($status === "retrying" || $status === "pending") {
        return "rgba(255, 221, 150, 0.28)";
      }

      return "rgba(167, 150, 255, 0.3)";
    }};
  background:
    ${({ $status }) => {
      if ($status === "sent") {
        return "rgba(31, 104, 62, 0.22)";
      }

      if ($status === "failed") {
        return "rgba(88, 14, 14, 0.34)";
      }

      if ($status === "cancelled") {
        return "rgba(255, 244, 223, 0.08)";
      }

      return "rgba(167, 150, 255, 0.14)";
    }};
  color:
    ${({ $status }) => {
      if ($status === "sent") {
        return "#bdfbd5";
      }

      if ($status === "failed") {
        return "#ffd9d9";
      }

      return "#fff2d2";
    }};
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
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
