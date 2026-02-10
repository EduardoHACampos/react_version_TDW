import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #000000;
  color: var(--color-text-light); /* Creme */
  padding: 40px 20px;
  /* Removemos a fonte fixa, agora herda do body (Baskervville) */
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

  h2 {
    /* Usa a fonte Rye e a cor Dourada */
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
  gap: 15px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 0.3s;

    /* Links do footer (ex: Press Kit) usam estilo de Título */
    font-family: var(--font-heading);
    color: var(--color-primary-text); /* Dourado */
    letter-spacing: 2px;
    font-size: 1.2rem;

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
`;
export const PressKitLink = styled.a`
  margin-top: var(--spacing-lg); /* Empurra para baixo dos ícones */
  text-decoration: none;
  margin:0;

  /* Mesma tipografia dos ícones antigos */
  color: var(--color-text-light);
  font-family: var(--font-heading);
  font-size: 1.2rem;

  transition:
    transform 0.2s,
    color 0.2s,
    filter 0.2s;

  /* Borda ou sublinhado opcional para parecer mais um botão/link */
  border-bottom: 1px solid transparent;

  &:hover {
    transform: translateY(-2px);
    color: var(--color-hover-purple);
    filter: drop-shadow(0 0 5px var(--color-hover-purple));
    border-bottom-color: var(--color-hover-purple);
  }

  /* No Mobile, garantimos que ele tenha espaço suficiente */
  @media (max-width: 768px) {
    margin-top: 1.5rem;
    font-size: 1.1rem; /* Um pouco maior para facilitar o toque */
  }
`;
export const Copyright = styled.div`
  text-align: center;
  padding-top: 15px;
`;
