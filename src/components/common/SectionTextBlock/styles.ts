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
  padding: var(--spacing-lg) 15px; 

  width: ${({ mobileWidth }) => mobileWidth || "100%"};
  max-width: 100vw; 
  box-sizing: border-box; 
  @media (min-width: 768px) {
    width: ${({ desktopWidth }) => desktopWidth || "auto"};
  }
`;

export const Title = styled.h1`
  font-family: var(--font-primary);
  font-weight: bold; 

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
