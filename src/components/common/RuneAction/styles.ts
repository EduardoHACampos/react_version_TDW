import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";

/**
 * Flip real (3D):
 * - Quem gira é o .flip-container (0 → 180 → 0)
 * - .front e .back ficam em faces opostas (back = rotateX(180deg))
 * - Sem animações separadas em front/back (evita "ruído" e conflito)
 */

const flipAndBack = keyframes`
  0%   { transform: rotateX(0deg); }
  50%  { transform: rotateX(180deg); }
  100% { transform: rotateX(0deg); }
`;

const BaseStyles = css`
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  outline: none;

  /* perspectiva no elemento clicável */
  perspective: 1000px;

  .flip-container {
    position: relative;
    display: inline-block;

    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;

    will-change: transform;
    transform-origin: center;

    /* evita “cortar”/flicker */
    overflow: visible;
  }

  .front,
  .back {
    position: absolute;
    inset: 0;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    /* ajuda a reduzir z-fighting/ruído */
    transform: translateZ(1px);
  }

  .front {
    font-family: var(--font-primary);
    color: var(--color-primary-text);
    font-weight: bold;
    transform: rotateX(0deg) translateZ(1px);
    transition: color 0.2s ease;
    z-index: 2;
  }

  .back {
    color: var(--color-hover-purple);
    transform: rotateX(180deg) translateZ(1px);
    pointer-events: none;
    z-index: 1;

    canvas {
      display: block;
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
    color: var(--color-hover-purple);
    transition-delay: 0.3s;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover .flip-container,
    &:focus-visible .flip-container {
      animation: none;
    }
  }
`;

export const ButtonElement = styled.button`
  ${BaseStyles}
`;

export const AnchorElement = styled.a`
  ${BaseStyles}
`;

export const LinkElement = styled(Link)`
  ${BaseStyles}
`;