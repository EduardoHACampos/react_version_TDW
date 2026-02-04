import styled from "styled-components";
import { motion } from "framer-motion";

export const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;

  background-color: rgba(
    0,
    0,
    0,
    0.7
  ); /* Escureci um pouco para mais contraste */
  backdrop-filter: blur(
    5px
  ); /* Reduzi levemente o blur para performance no mobile */
  -webkit-backdrop-filter: blur(5px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled(motion.div)`
  background: var(--color-background-card);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border);
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  /* --- MOBILE FIRST (Padrão) --- */
  width: 95%; /* Ocupa quase toda a largura no celular */
  max-width: 500px; /* Limite máximo para não esticar demais em tablets */
  padding: var(
    --spacing-lg
  ); /* Padding menor para economizar espaço no mobile */

  /* --- A CORREÇÃO DO "SEQUESTRO" --- */
  max-height: 90dvh; /* Altura máx de 90% da viewport dinâmica (conta barra do navegador) */
  overflow-y: auto; /* Scroll interno automático se o conteúdo for maior */

  /* Estilização da Scrollbar (para combinar com o tema Dark) */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-border);
    border-radius: 3px;
  }

  /* --- DESKTOP (Ajustes para telas maiores) --- */
  @media (min-width: 768px) {
    width: 90%; /* Ajuste fino para desktop */
    padding: var(--spacing-xl); /* Mais respiro interno */
  }

  @media (min-width: 2560px) {
    max-width: 700px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: var(--spacing-md); /* Mantive espaçamento relativo */
  right: var(--spacing-md);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 10; /* Garante que fique acima do conteúdo se houver sobreposição */

  img {
    width: 24px; /* Aumentei levemente a área de clique para toque (touch) */
    height: 24px;
  }
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-lg);

  h2 {
    font-family: var(--font-heading);
    font-size: var(
      --font-size-xl
    ); /* Levemente menor no mobile se necessário, ou mantenha xxl */
    color: var(--color-text-light);
    margin-bottom: var(--spacing-sm);

    @media (min-width: 768px) {
      font-size: var(--font-size-xxl);
    }
  }

  p {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm); /* Texto de apoio menor no mobile */
    color: var(--color-primary-text);

    @media (min-width: 768px) {
      font-size: var(--font-size-md);
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-family: var(--font-heading);
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-md);
  }

  input,
  textarea {
    padding: 12px;
    border-radius: 5px;
    background-color: #333;
    color: var(--color-text-light);
    border: 1px solid var(--color-border);
    font-family: var(--font-primary);
    font-size: 16px; /* Evita zoom automático no iOS ao focar (importante para mobile) */
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: var(--color-text-light);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px; /* Garante altura mínima digitável no celular */
  }
`;

export const FeedbackMessage = styled.p<{ type: "success" | "error" }>`
  text-align: center;
  font-size: var(--font-size-md);
  color: ${({ type }) => (type === "success" ? "#4caf50" : "#f44336")};
  padding: var(--spacing-md) 0;
`;
export const ErrorMessage = styled.span`
  color: #ff4d4d; /* Vermelho claro para destaque no fundo escuro */
  font-family: var(--font-primary);
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;