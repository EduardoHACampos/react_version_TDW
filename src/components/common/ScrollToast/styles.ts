import styled from "styled-components";
import { motion } from "framer-motion";

export const ToastWrapper = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--color-background-card);
  color: var(--color-text-light);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  font-family: var(--font-primary);
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 14px;
    height: 14px;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  &:hover img {
    opacity: 1;
  }
`;
