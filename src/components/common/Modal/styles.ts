import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled(motion.div)`
  background: var(--color-background-card);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border);
  padding: var(--spacing-xl);
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
    width: 95%;
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

  img {
    width: 20px;
    height: 20px;
  }
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-lg);
  
  h2 {
    font-family: var(--font-heading);
    font-size: var(--font-size-xxl);
    color: var(--color-text-light);
    margin-bottom: var(--spacing-sm);
  }

  p {
    font-family: var(--font-primary);
    font-size: var(--font-size-md);
    color: var(--color-primary-text);
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

  input, textarea {
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    background-color: #333;
    color: var(--color-text-light);
    border: 1px solid var(--color-border);
    font-family: var(--font-primary);
    font-size: var(--font-size-md);
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: var(--color-text-light);
    }
  }

  textarea {
    resize: vertical;
  }
`;

export const FeedbackMessage = styled.p<{ type: 'success' | 'error' }>`
  text-align: center;
  font-size: var(--font-size-lg);
  color: ${({ type }) => (type === 'success' ? '#4caf50' : '#f44336')};
  padding: var(--spacing-md) 0;
`;