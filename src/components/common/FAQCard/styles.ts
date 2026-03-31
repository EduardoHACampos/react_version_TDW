/*
 English: 
 Styles for the reusable FAQ Card Accordion.
 Added the RuneSvg component to render the custom runic SVGs inline with the text.
 The runes are styled with the theme's purple and a subtle glow to emphasize the decoding magic.
 
 Explicação em português aqui: 
 Estilos para o Cartão Sanfona de FAQ reutilizável.
 Adicionado o componente RuneSvg para renderizar os SVGs rúnicos personalizados em linha com o texto.
 As runas são estilizadas com o roxo do tema e um brilho subtil para enfatizar a magia de descodificação.
 
 Caminho / Path: src/components/common/FAQCard/styles.ts
*/

import styled from "styled-components";

export const CardContainer = styled.div<{ $isOpen: boolean }>`
  background-color: ${({ $isOpen }) => ($isOpen ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.03)")};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(167, 150, 255, 0.4);
  }
`;

export const CardHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  padding: 1.5rem;
  gap: 1.5rem;
  cursor: pointer;
  text-align: left;
  color: var(--color-primary-text);
  
  &:focus {
    outline: none;
  }
`;

export const QuestionTitle = styled.h3<{ $isOpen: boolean }>`
  font-family: var(--font-primary);
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.4;
  color: ${({ $isOpen }) => ($isOpen ? "var(--color-hover-purple)" : "var(--color-primary-text)")};
  transition: color 0.3s ease;
  
  flex: 1; 
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ToggleIcon = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  flex-shrink: 0; 
  width: 32px;
  height: 32px;
  
  border-radius: 50%;
  background-color: ${({ $isOpen }) => ($isOpen ? "var(--color-hover-purple)" : "rgba(255, 255, 255, 0.1)")};
  color: ${({ $isOpen }) => ($isOpen ? "#fff" : "var(--color-primary-text)")};
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1;
  transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "rotate(0deg)")};
`;

export const CardBody = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  overflow: hidden;
  transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out;
`;

export const AnswerContent = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: #c7d5e0;
  font-family: var(--font-primary);
  font-size: 1.05rem;
  line-height: 1.6;
  word-break: break-word;

  p {
    margin: 0;
  }
`;

/* English: New styled component for the inline rune SVGs / Explicação em português aqui: Novo componente estilizado para os SVGs rúnicos em linha */
export const RuneSvg = styled.svg`
  width: 0.75em;
  height: 1em;
  display: inline-block;
  vertical-align: middle;
  color: var(--color-hover-purple);
  filter: drop-shadow(0 0 4px var(--color-hover-purple));
  margin: 0 1px;
`;