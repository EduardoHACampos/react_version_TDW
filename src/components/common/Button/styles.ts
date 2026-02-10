import styled from "styled-components";
import buttonBg from "../../../assets/button01edited.png";

export const CustomButton = styled.button`
  /* --- 1. MOBILE FIRST (Padrão) --- */
  /* Tamanho ideal para toque no celular sem ocupar a tela toda */
  width: 160px;
  height: 100px;
  font-size: 1rem;

  /* Configuração do Background (Estica a imagem para o tamanho do botão) */
  background-image: url(${buttonBg});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  /* Reset e Layout */
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  /* Ajuste de padding para compensar a borda da imagem se necessário */
  padding: 0 10px;
  padding-bottom: 4px;

  /* Tipografia */
  font-family: var(--font-heading); /* Rye */
  color: var(--color-primary-text); /* Dourado */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8); /* Sombra para leitura no metal */
  font-weight: normal;
  letter-spacing: 1px;

  /* Transição suave para tamanhos e efeitos */
  transition:
    transform 0.2s ease-in-out,
    filter 0.2s,
    width 0.3s,
    height 0.3s,
    font-size 0.3s;

  /* Hover Effects */
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 5px var(--color-gold-shadow));
    color: var(--color-hover-purple);
  }

  &:disabled {
    filter: grayscale(80%);
    cursor: not-allowed;
    transform: scale(1);
    opacity: 0.7;
  }

  /* --- 2. DESKTOP (Telas a partir de 1024px) --- */
  /* Aumentamos para ficar proporcional em monitores */
  @media (min-width: 1024px) {
    width: 200px;
    height: 100px;
    font-size: 1.2rem;
  }

  /* --- 3. 4K / ULTRA-WIDE (Telas a partir de 2560px) --- */
  /* Botão grande para não parecer um selo em telas gigantes */
  @media (min-width: 2560px) {
    width: 320px;
    height: 150px;
    font-size: 1.5rem;
  }
`;
