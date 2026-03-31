/*
 English: 
 Styles for the standalone About page.
 Reuses the Steam-like aesthetic we previously created, adapted to be a full page layout with proper header spacing.
 
 Explicação em português aqui: 
 Estilos para a página standalone About.
 Reutiliza a estética estilo Steam que criamos anteriormente, adaptada para ser um layout de página inteira com o espaçamento correto do header.
*/

import styled from "styled-components";

export const AboutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  /* English: 120px top padding ensures the content isn't hidden behind the fixed header / Explicação em português aqui: 120px de padding superior garante que o conteúdo não fique escondido atrás do header fixo */
  padding: 120px 1.5rem 4rem 1.5rem; 
  background-color: var(--color-background-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AboutWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SectionHeader = styled.h2`
  font-family: var(--font-primary);
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  
  border-bottom: 2px solid var(--color-hover-purple); 
  padding-bottom: 0.5rem;
`;

export const Paragraph = styled.p`
  font-family: var(--font-primary);
  color: #acb2b8; 
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 0;

  strong {
    color: var(--color-hover-purple); 
  }
`;

export const GifImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  margin: 1rem 0;
  border: 1px solid rgba(167, 150, 255, 0.2); 
`;

export const EarlyAccessBox = styled.div`
  background-color: rgba(167, 150, 255, 0.05);
  border: 1px solid rgba(167, 150, 255, 0.2);
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const EarlyAccessHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-family: var(--font-primary);
    color: #fff;
    font-size: 1.6rem;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    font-family: var(--font-primary);
    color: #acb2b8;
    font-size: 1.1rem;
    font-style: italic;
    margin: 0;
  }
`;

export const QAItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  h4 {
    font-family: var(--font-primary);
    color: var(--color-hover-purple);
    font-size: 1.2rem;
    margin: 0;
  }

  p {
    font-family: var(--font-primary);
    color: #c7d5e0;
    font-size: 1.05rem;
    line-height: 1.6;
    margin: 0;
  }
`;