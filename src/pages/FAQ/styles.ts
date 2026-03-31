
import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  padding-top: 120px; 
  padding-bottom: 5rem;
  background-color: var(--color-background-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
  padding: 0 1.5rem;

  h1 {
    font-family: var(--font-heading);
    color: var(--color-hover-purple);
    font-size: 2.5rem;
    letter-spacing: 2px;
    margin-bottom: 1rem;
    text-transform: uppercase;

    @media (min-width: 768px) {
      font-size: 3.5rem;
    }
  }

  p {
    font-family: var(--font-primary);
    font-size: 1.2rem;
    color: #c7d5e0;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.9;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const CategoryBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CategoryTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-primary-text);
  border-bottom: 2px solid rgba(167, 150, 255, 0.3);
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  text-transform: uppercase;
`;