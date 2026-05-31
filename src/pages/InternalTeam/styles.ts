import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 960px;
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
`;

export const PageSubtitle = styled.p`
  margin: 0.5rem 0 0;
  color: rgba(255, 244, 223, 0.76);
  line-height: 1.7;
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

  @media (min-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 221, 150, 0.16);
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-family: var(--font-primary);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-hover-purple);
    box-shadow: 0 0 0 3px rgba(167, 150, 255, 0.14);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const TextInput = styled.input`
  ${sharedInputStyles}
`;

export const SelectInput = styled.select`
  ${sharedInputStyles}
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

export const PrimaryButton = styled.button`
  border: none;
  border-radius: 12px;
  padding: 0.85rem 1.2rem;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 0.96rem;
  color: #fff;
  background: linear-gradient(135deg, rgba(167, 150, 255, 0.8), rgba(85, 55, 140, 1));
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
