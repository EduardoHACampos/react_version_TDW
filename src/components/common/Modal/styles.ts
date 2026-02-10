import styled from "styled-components";
import { motion } from "framer-motion";

export const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
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
  width: 95%;
  max-width: 500px;
  padding: var(--spacing-lg);
  max-height: 90dvh;
  overflow-y: auto;

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

  @media (min-width: 768px) {
    width: 90%;
    padding: var(--spacing-xl);
  }

  @media (min-width: 2560px) {
    max-width: 700px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 10;
  img {
    width: 24px;
    height: 24px;
  }
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-lg);

  h2 {
    /* 👇 MUDANÇA: Agora usa Baskervville para leitura clara */
    font-family: var(--font-primary);
    font-weight: bold; /* Bold para manter hierarquia de título */

    font-size: var(--font-size-xl);
    color: var(
      --color-text-light
    ); /* Cor Creme para leitura, ou use primary-text para Dourado */
    margin-bottom: var(--spacing-sm);

    @media (min-width: 768px) {
      font-size: var(--font-size-xxl);
    }
  }

  p {
    font-family: var(--font-primary);
    font-size: var(--font-size-sm);
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
    font-family: var(--font-primary);
    font-weight: bold;
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-md);
    color: var(--color-primary-text);
  }

  input,
  textarea {
    padding: 12px;
    border-radius: 5px;
    background-color: #333;
    color: var(--color-text-light);
    border: 1px solid var(--color-border);
    font-family: var(--font-primary);
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: var(--color-text-light);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

export const FeedbackMessage = styled.p<{ type: "success" | "error" }>`
  text-align: center;
  font-size: var(--font-size-md);
  color: ${({ type }) => (type === "success" ? "#4caf50" : "#f44336")};
  padding: var(--spacing-md) 0;
  font-family: var(--font-primary);
`;

export const ErrorMessage = styled.span`
  color: #ff4d4d;
  font-family: var(--font-primary);
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;
