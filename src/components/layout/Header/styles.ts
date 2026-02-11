import styled, { keyframes, css } from "styled-components";
import { NavLink } from "react-router-dom";

const introSpin = keyframes`
  from { transform: rotateX(180deg); opacity: 0; }
  to { transform: rotateX(0deg); opacity: 1; }
`;

/* Animação de rotação: Inicia em 0deg, atinge 180deg (Runas) e finaliza em 360deg (Original) */
const flipAndBack = keyframes`
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(180deg); } 
  100% { transform: rotateX(360deg); }
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
  gap: 2rem;
  align-items: center;

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

export const StyledNavLink = styled(NavLink)<{ $ready?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding-bottom: 5px;
  perspective: 1000px;
  cursor: pointer;
  font-size: 1.25rem;

  .flip-container {
    position: relative;
    display: inline-block;
    transform-style: preserve-3d;
    /* Transição suave para o estado base da rotação */
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    ${({ $ready }) =>
      $ready
        ? css`
            animation: ${introSpin} 1.5s ease-out backwards;
          `
        : "opacity: 0;"}
  }

  .front,
  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    white-space: nowrap;
    transition:
      color 0.3s,
      text-shadow 0.3s;
  }

  .front {
    position: relative;
    z-index: 2;
    font-family: var(--font-primary);
    color: var(--color-primary-text);
    font-weight: bold;
    transform: rotateX(0deg);
  }

  .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-family: var(--font-witchcraft);
    color: var(--color-hover-purple);
    font-size: 1.1em;
    padding-top: 3px;
    transform: rotateX(180deg);
  }

  &:hover .flip-container {
    /* Duração de 0.6s para um efeito visual de rotação rápida conforme feedback */
    animation: ${flipAndBack} 0.6s ease-in-out forwards;
  }

  &:hover .front {
    color: var(--color-hover-purple);
    /* Delay sincronizado com a metade da animação de rotação (0.3s) */
    transition-delay: 0.3s;
  }

  &.active .front {
    color: var(--color-hover-purple);
    font-weight: bold;
    text-shadow: 0 0 8px rgba(167, 150, 255, 0.4);
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