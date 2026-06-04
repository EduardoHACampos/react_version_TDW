import styled from "styled-components";
import introBackground from "../../assets/image485-bg.avif"; // Imagem de fundo da introdução

// Seção 1: Introdução
export const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ocupa a altura da tela */
  padding: var(--spacing-xl);
  box-sizing: border-box;
  text-align: center;

  /* Aplica o background com gradiente apenas nesta seção */
  background-image: radial-gradient(
      circle,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 1) 100%
    ),
    url(${introBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (min-width: 768px) {
    align-items: flex-start;
    button{
      
    }
  }
`;

// Container para o botão de rolagem
export const ScrollButtonContainer = styled.div`
  margin-top: var(--spacing-lg);
`;

// Seção 2: Lista de Vagas
export const JobsSection = styled.section`
  width: 100%;
  padding: var(--spacing-xl) var(--spacing-md);
  box-sizing: border-box;
  background-color: var(--color-background-dark); /* Fundo escuro simples */
`;
