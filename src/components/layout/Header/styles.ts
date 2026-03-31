import styled, { keyframes, css } from "styled-components";
import { NavLink, Link } from "react-router-dom";

const introSpin = keyframes`
  from { transform: rotateX(180deg); opacity: 0; }
  to   { transform: rotateX(0deg);   opacity: 1; }
`;

const flipAndBack = keyframes`
  0%   { transform: rotateX(0deg); }
  50%  { transform: rotateX(180deg); }
  100% { transform: rotateX(0deg); }
`;

const runeTransient = keyframes`
  0%   { opacity: 1; }
  70%  { opacity: 1; }
  100% { opacity: 0; }
`;

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
  align-items: center;

  @media (max-width: 1024px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: var(--color-background-dark);
    padding: 1.5rem 0;
    text-align: center;
    box-sizing: border-box;
    gap: 1.5rem;
  }

  @media (min-width: 1025px) {
    gap: 2rem;
  }

  @media (min-width: 1280px) {
    gap: 3.5rem;
  }

  @media (min-width: 1600px) {
    gap: 4.25rem;
  }
`;

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
  font-size: 1rem;
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

  &:hover .flip-container,
  &:focus-visible .flip-container {
    animation: ${flipAndBack} 0.6s ease-in-out both;
  }

  &:hover .front,
  &:focus-visible .front {
    animation: ${frontTransient} 0.6s steps(1, end) both;
    color: var(--color-hover-purple);
    text-shadow: 0 0 8px rgba(167, 150, 255, 0.25);
  }

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

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  /* English: Hover logic for the Dropdown Trigger.
     Explicação em português aqui: Lógica de hover para o gatilho do Dropdown. */
  &:hover .dropdown-arrow {
    background-color: var(--color-hover-purple);
  }

  /* English: Force the text inside the HeaderFlipItem (front face) to turn purple when the whole container is hovered.
     Explicação em português aqui: Força o texto dentro do HeaderFlipItem (face frontal) a ficar roxo quando o contêiner inteiro recebe hover. */
  &:hover .front {
    color: var(--color-hover-purple);
    text-shadow: 0 0 8px rgba(167, 150, 255, 0.25);
  }

  &:hover .dropdown-content {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);

    @media (max-width: 1024px) {
      transform: none;
      display: flex;
    }
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background-color: var(--color-background-dark);
  border: 1px solid rgba(167, 150, 255, 0.2);
  min-width: 220px;
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8);
  padding: 0.5rem 0;
  border-radius: 4px;

  @media (max-width: 1024px) {
    position: static;
    transform: none;
    display: none;
    border: none;
    box-shadow: none;
    width: 100%;
    padding: 1rem 0 0 0;
    background-color: transparent;
  }
`;

export const DropdownItem = styled(Link)`
  color: var(--color-primary-text);
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-family: var(--font-primary);
  font-size: 0.95rem;
  transition:
    background-color 0.2s,
    color 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: rgba(167, 150, 255, 0.1);
    color: var(--color-hover-purple);
  }

  @media (max-width: 1024px) {
    justify-content: center;
    gap: 0.5rem;
  }
`;

export const DropdownItemExternal = styled.a`
  color: var(--color-primary-text);
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-family: var(--font-primary);
  font-size: 0.95rem;
  transition:
    background-color 0.2s,
    color 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: rgba(167, 150, 255, 0.1);
    color: var(--color-hover-purple);
  }

  .icon {
    font-size: 0.8rem;
    opacity: 0.7;
  }

  @media (max-width: 1024px) {
    justify-content: center;
    gap: 0.5rem;
  }
`;

export const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 0; 
  position: relative;

  /* English: Prevents the 'active' class from making the trigger purple permanently 
     Explicação em português aqui: Impede que a classe 'active' deixe o gatilho roxo permanentemente */
  .active .front {
    color: var(--color-primary-text) !important;
    text-shadow: none !important;
  }

  /* English: Re-applies the purple hover effect specifically for the dropdown trigger
     Explicação em português aqui: Reaplica o efeito roxo de hover especificamente para o gatilho do dropdown */
  &:hover .front,
  &:hover .active .front {
    color: var(--color-hover-purple) !important;
    text-shadow: 0 0 8px rgba(167, 150, 255, 0.25) !important;
  }
`;

export const DropdownArrow = styled.div<{ $iconSrc: string }>`
  width: 12px;
  height: 12px;

  /* English: Default color is now the primary text color (Gold/White).
     Explicação em português aqui: A cor padrão agora é a cor primária de texto (Dourado/Branco). */
  background-color: var(--color-primary-text);

  -webkit-mask: url(${({ $iconSrc }) => $iconSrc}) no-repeat center / contain;
  mask: url(${({ $iconSrc }) => $iconSrc}) no-repeat center / contain;

  transform: rotate(90deg);
  pointer-events: none;
  transition: background-color 0.3s ease;

  margin-left: -0.5rem;
  margin-top: 0.1rem;
`;
