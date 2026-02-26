import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #000000;
  color: var(--color-text-light);
  padding: 40px 20px;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
  margin-bottom: 20px;
  max-width: 1200px;
  margin: 0 auto 20px auto;
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  text-align: center;
  margin: 20px;
  flex-direction: column;

  /* TÍTULO DA SEÇÃO (Mantém Rye/Dourado por ser título) */
  h2 {
    font-family: var(--font-heading);
    color: var(--color-primary-text);
    letter-spacing: 2px;
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Garante a centralização horizontal */
  gap: 15px;
  flex-wrap: wrap; /* Permite que os itens quebrem para a linha de baixo */
  max-width: 100%; /* Evita que o container ultrapasse a largura da tela */

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 0.3s;

    font-family: var(--font-primary);
    color: var(--color-primary-text);
    letter-spacing: 1px;
    font-size: 1.1rem;
    font-weight: bold;

    &:hover {
      opacity: 0.7;
    }
  }

  img {
    width: 30px;
    height: 30px;
    display: block;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  /* Ajuste específico para telas pequenas (celular) */
  @media (max-width: 480px) {
    gap: 20px; /* Aumenta um pouco o espaço para facilitar o toque */
    padding: 0 10px;
  }
`;

export const PressKitLink = styled.a`
  margin-top: var(--spacing-lg);
  text-decoration: none;
  margin: 0;

  color: var(--color-text-light);

  /* 👇 MUDANÇA: Agora usa Baskervville */
  font-family: var(--font-primary);
  font-size: 1.1rem;
  font-weight: bold;

  transition:
    transform 0.2s,
    color 0.2s,
    filter 0.2s;

  border-bottom: 1px solid transparent;

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

export const Copyright = styled.div`
  text-align: center;
  padding-top: 15px;

  /* Garante que o copyright também seja legível */
  p {
    font-family: var(--font-primary);
    font-size: 0.9rem;
  }
`;
