import { styled } from "styled-components";

export const DownloadLink = styled.a`
  margin-top: var(--spacing-lg);
  text-decoration: none;
  margin: 0;
  color: var(--color-text-light);
  font-family: var(--font-primary);
  font-size: 1.1rem;
  font-weight: bold;
  transition: transform 0.2s, color 0.2s, filter 0.2s;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  display: inline-block; /* Garante que o transform funcione */

  &:hover {
    transform: translateY(-2px);
    color: var(--color-hover-purple);
    filter: drop-shadow(0 0 5px var(--color-hover-purple));
    border-bottom-color: var(--color-hover-purple);
  }

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    font-size: 1.1rem;
  }
`;