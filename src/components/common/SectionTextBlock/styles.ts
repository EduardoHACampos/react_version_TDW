import styled from "styled-components";

// A interface do Wrapper agora espera a prop maxWidth
export const Wrapper = styled.div<{ desktopWidth?: string; mobileWidth?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) 0;

  width: ${({ mobileWidth }) => mobileWidth || "auto"};
  max-width: 100%; /* Impede que o componente quebre o layout em telas muito estreitas */

  /* Em telas maiores, aplica a largura de desktop */
  @media (min-width: 768px) {
    width: ${({ desktopWidth }) => desktopWidth || "auto"};
  }
  @media (min-width: 2540px) {
    width: 515px;
  }
`;

export const Title = styled.h1`
  font-family: var(--font-special);
  color: var(--color-text-light);
  font-size: var(--font-size-xxl);

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
`;

export const DividerImage = styled.img<{ rotated?: boolean }>`
  width: 100%;
  max-width: 300px;
  
  /* Aplica a rotação se a prop 'rotated' for verdadeira */
  ${({ rotated }) => rotated && `
    transform: rotate(180deg);
  `}`
