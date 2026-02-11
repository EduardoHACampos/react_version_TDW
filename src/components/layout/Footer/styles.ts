import DownloadButton from "../../common/DownloadButton";
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
  gap: 15px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 0.3s;

    /* 👇 MUDANÇA: Agora usa Baskervville para melhor leitura */
    font-family: var(--font-primary);
    color: var(--color-primary-text);
    letter-spacing: 1px; /* Espaçamento levemente menor para fonte serifada */
    font-size: 1.1rem;
    font-weight: bold; /* Bold ajuda na leitura da Baskervville sobre fundo escuro */

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

export const Copyright = styled.div`
  text-align: center;
  padding-top: 15px;

  /* Garante que o copyright também seja legível */
  p {
    font-family: var(--font-primary);
    font-size: 0.9rem;
  }
`;
