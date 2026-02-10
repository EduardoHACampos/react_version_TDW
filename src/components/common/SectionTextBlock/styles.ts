import styled from "styled-components";

export const Wrapper = styled.div<{
  desktopWidth?: string;
  mobileWidth?: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) 0;

  width: ${({ mobileWidth }) => mobileWidth || "auto"};
  max-width: 100%;

  @media (min-width: 768px) {
    width: ${({ desktopWidth }) => desktopWidth || "auto"};
  }
  @media (min-width: 2540px) {
    width: 665px;
  }
`;

export const Title = styled.h1`
  /* 👇 MUDANÇA: Títulos agora em Baskervville (Legível e Clássico) */
  font-family: var(--font-primary);
  font-weight: bold; /* Peso bold para destacar como título */

  /* 👇 MUDANÇA: Dourado para diferenciar do texto comum (que é Creme) */
  color: var(--color-primary-text);

  font-size: var(--font-size-xxl);
  text-align: center;
  letter-spacing: 1px;
`;

export const Text = styled.p`
  font-family: var(--font-primary);
  font-size: var(--font-size-lg);
  line-height: 1.25;
  color: var(--color-text-light);
  max-width: 90%;
  font-weight: 400;
  text-align: left;

  & + & {
    margin-top: var(--spacing-md);
  }

  @media (min-width: 2540px) {
    max-width: 75%;
  }
`;

export const DividerImage = styled.img<{ rotated?: boolean }>`
  width: 100%;
  max-width: 300px;

  ${({ rotated }) =>
    rotated &&
    `
    transform: rotate(180deg);
  `}
`;
