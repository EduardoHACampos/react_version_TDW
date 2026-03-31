import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px); /* Height minus header / Altura menos o cabeçalho */
  background-color: var(--color-background-dark);
  padding: 2rem;
  text-align: center;
  margin-top: 80px;
`;

export const IconWrapper = styled.div`
  font-size: 4rem;
  color: var(--color-hover-purple);
  margin-bottom: 1.5rem;
  animation: ${pulse} 2s infinite ease-in-out;
`;

export const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  color: var(--color-primary-text);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const Subtitle = styled.p`
  font-family: var(--font-primary);
  font-size: 1.2rem;
  color: #c7d5e0;
  max-width: 500px;
  line-height: 1.6;
  margin-bottom: 2rem;
`;