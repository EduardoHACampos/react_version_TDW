import styled, { keyframes, css } from "styled-components";
import { NavLink } from "react-router-dom";

/* Animação de Entrada: Começa nas Runas (180deg) e vira para Inglês (0deg) */
const introSpin = keyframes`
  from {
    transform: rotateX(180deg); /* Começa de costas (Runas) */
    opacity: 0;
  }
  to {
    transform: rotateX(0deg); /* Termina de frente (Inglês) */
    opacity: 1;
  }
`;

export const HeaderContainer = styled.header`
  background-color: var(--color-background-dark);
  border-bottom: none;
  padding: 1rem 5%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: 2560px) {
    max-width: 1800px;
  }
`;

export const Logo = styled.img`
  height: 60px;
  display: block;
`;

export const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem; /* Gap padrão (Mobile/Tablet) */
  align-items: center;

  /* 👇 MUDANÇA AQUI: Aumenta o espaço para 3rem no Desktop */
  @media (min-width: 1024px) {
    gap: 3rem;
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: var(--color-background-dark);
    padding: 1rem 0;
    text-align: center;
  }
`;

/* --- O LINK (PALCO 3D) --- */
export const StyledNavLink = styled(NavLink)<{ $ready?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  /* Removemos bordas e cores daqui, pois quem manda agora são as faces */
  padding-bottom: 5px;

  /* Perspectiva para o efeito 3D */
  perspective: 1000px;
  cursor: pointer;

  /* Tamanho da fonte base */
  font-size: 1.25rem;

  /* --- O CONTAINER QUE GIRA --- */
  .flip-container {
    position: relative;
    display: inline-block;
    transform-style: preserve-3d;

    /* Transição suave de "ir e voltar" */
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    /* Animação de Entrada (Load) */
    ${({ $ready }) =>
      $ready
        ? css`
            animation: ${introSpin} 1.5s ease-out backwards;
          `
        : "opacity: 0;"}
  }

  /* --- FACES (FRENTE E VERSO) --- */
  .front,
  .back {
    display: flex;
    align-items: center;
    justify-content: center;

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    /* Evita quebra de linha para manter a largura consistente */
    white-space: nowrap;

    transition:
      color 0.3s,
      text-shadow 0.3s;
  }

  /* --- A FRENTE (INGLÊS - RYE) --- */
  .front {
    /* Position Relative deixa o elemento ditar a largura do container */
    position: relative;
    z-index: 2;

    font-family: var(--font-special); /* Rye */
    color: var(--color-primary-text); /* Dourado */

    transform: rotateX(0deg);
  }

  /* --- O VERSO (RUNAS - WITCHCRAFT) --- */
  .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    font-family: var(--font-witchcraft); /* Runas */
    color: var(--color-hover-purple); /* Roxo */

    /* Ajuste fino para as runas não ficarem gigantes comparadas ao texto */
    font-size: 1.1em;
    padding-top: 3px;

    transform: rotateX(180deg);
  }

  /* --- HOVER EFFECTS --- */

  /* Quando o mouse está em cima do Link, gira o Container */
  &:hover .flip-container {
    transform: rotateX(180deg);
  }

  /* Estado Ativo (Página Selecionada) */
  &.active .front {
    color: var(--color-hover-purple);
    font-weight: normal;
    text-shadow: 0 0 8px rgba(167, 150, 255, 0.4);
  }

  &.active .back {
    color: var(--color-hover-purple);
    text-shadow: 0 0 12px rgba(167, 150, 255, 0.6);
  }
`;

export const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;
