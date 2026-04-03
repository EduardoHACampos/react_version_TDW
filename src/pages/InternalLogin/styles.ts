import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-background-dark);
  padding: 2rem;
`;

export const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: var(--color-background-card);
  padding: 3rem 2rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

/*
Studio logo styling, centered horizontally.
Estilização do logo do estúdio, centralizado horizontalmente.
*/
export const Logo = styled.img`
  max-width: 180px;
  height: auto;
  margin: 0 auto 1rem auto;
  display: block;
  object-fit: contain;
`;

export const Subtitle = styled.p`
  color: #ff4d4d;
  text-align: center;
  margin: 0;
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: var(--color-text-light);
    font-size: 0.9rem;
  }
`;

export const Input = styled.input`
  padding: 10px 15px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-dark);
  color: #fff;
  font-family: var(--font-primary);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--color-hover-purple);
  }
`;

export const ErrorMessage = styled.div`
  background-color: rgba(255, 77, 77, 0.1);
  color: #ff4d4d;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ff4d4d;
  text-align: center;
  font-size: 0.9rem;
`;

export const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 12px;
  background-color: var(--color-hover-purple);
  color: #000;
  border: none;
  border-radius: 4px;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color-primary-text);
  }

  &:disabled {
    background-color: #555;
    color: #888;
    cursor: not-allowed;
  }
`;