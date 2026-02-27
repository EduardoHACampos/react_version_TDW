import styled, { keyframes, css } from "styled-components";
import { NavLink } from "react-router-dom";

/** Intro do menu */
const introSpin = keyframes`
  from { transform: rotateX(180deg); opacity: 0; }
  to   { transform: rotateX(0deg);   opacity: 1; }
`;

/** Flip real: 0 → 180 → 0 */
const flipAndBack = keyframes`
  0%   { transform: rotateX(0deg); }
  50%  { transform: rotateX(180deg); }
  100% { transform: rotateX(0deg); }
`;

/**
 * ✅ Runas aparecem no começo e somem antes do fim
 * (igual comportamento esperado)
 */
const runeTransient = keyframes`
  0%   { opacity: 1; }
  70%  { opacity: 1; }
  100% { opacity: 0; }
`;

/**
 * ✅ Texto normal some durante o “miolo” do flip e volta no final
 * IMPORTANTE: usamos steps pra não dar “fade preto”
 */
const frontTransient = keyframes`
  0%   { opacity: 1; }
  40%  { opacity: 1; }
  41%  { opacity: 0; }
  84%  { opacity: 0; }
  85%  { opacity: 1; }
  100% { opacity: 1; }
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
  gap: 4.5rem; /* ✅ mais espaço */
  align-items: center;

  @media (min-width: 1024px) {
    gap: 5.5rem; /* ✅ mais espaço no desktop */
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
    box-sizing: border-box;
    gap: 1.5rem; /* mobile */
  }
`;
/**
 * Container por item
 */
export const HeaderItem = styled("div").withConfig({
  shouldForwardProp: (prop) =>
    !["padX", "width", "height", "canvasNudgeY"].includes(prop),
})<{
  width: string;
  padX: string;
  height: string;
  canvasNudgeY: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ width }) => width};
  height: ${({ height }) => height};

  .flip-container {
    width: 100%;
    height: 100%;
    padding: 0 ${({ padX }) => padX};
  }

  .back {
    transform: translateY(${({ canvasNudgeY }) => canvasNudgeY});
  }
`;

export const StyledNavLink = styled(NavLink)<{ $ready?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.25rem;
  outline: none;

  perspective: 1000px;

  .flip-container {
    position: relative;
    display: inline-grid;
    place-items: center;

    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;

    will-change: transform;
    overflow: visible;

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
    grid-area: 1 / 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .front {
    z-index: 2;
    font-family: var(--font-primary);
    color: var(--color-primary-text);
    font-weight: bold;

    transform: rotateX(0deg);
    transition:
      color 0.3s ease,
      text-shadow 0.3s ease;
  }

  .back {
    z-index: 1;
    transform: rotateX(180deg);
    color: var(--color-hover-purple);
    pointer-events: none;
    line-height: 1;

    /* ✅ por padrão, runas invisíveis */
    opacity: 0;

    canvas {
      display: block;
      height: 1.05em;
      width: auto;
      transform: translateZ(0);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      will-change: transform;
    }
  }

  /* ✅ Flip e volta */
  &:hover .flip-container,
  &:focus-visible .flip-container {
    animation: ${flipAndBack} 0.6s ease-in-out both;
  }

  /* ✅ Texto some SEM “fade preto” (steps = troca seca) */
  &:hover .front,
  &:focus-visible .front {
    animation: ${frontTransient} 0.6s steps(1, end) both;
    color: var(--color-hover-purple);
    text-shadow: 0 0 8px rgba(167, 150, 255, 0.25);
  }

  /* ✅ Runas aparecem só durante o flip */
  &:hover .back,
  &:focus-visible .back {
    opacity: 1;
    animation: ${runeTransient} 0.6s steps(1, end) both;
  }

  &.active .front {
    color: var(--color-hover-purple);
    font-weight: bold;
    text-shadow: 0 0 8px rgba(167, 150, 255, 0.4);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover .flip-container,
    &:focus-visible .flip-container,
    &:hover .front,
    &:focus-visible .front,
    &:hover .back,
    &:focus-visible .back {
      animation: none;
    }

    .back {
      opacity: 0;
    }
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