import styled, { keyframes } from "styled-components";

/**
 * Mesmo flip híbrido para o "CONTACT" no texto:
 * - front gira (3D)
 * - back (canvas) só aparece some por opacity (sem 3D)
 */
const frontFlip = keyframes`
  0%   { transform: rotateX(0deg);   opacity: 1; }
  45%  { transform: rotateX(180deg); opacity: 0; }
  55%  { transform: rotateX(180deg); opacity: 0; }
  100% { transform: rotateX(360deg); opacity: 1; }
`;

const backPulse = keyframes`
  0%   { opacity: 0; transform: scale(0.96); }
  8%   { opacity: 1; transform: scale(1); }
  55%  { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.98); }
`;

export const PageContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-top: 30px;
  height: 100vh;
  justify-content: center;

  @media (min-width: 1024px) {
    justify-content: flex-end;
  }
`;

export const ModalTrigger = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: bottom;

  cursor: pointer;
  position: relative;
  margin: 0 5px;

  .flip-container {
    position: relative;
    display: inline-block;
    perspective: 1000px;
    min-width: 110px;
    height: 1.2em;
    text-align: center;
    overflow: hidden;
  }

  .front,
  .back {
    position: absolute;
    inset: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }

  .front {
    z-index: 2;
    font-family: var(--font-primary);
    font-weight: bold;
    color: var(--color-primary-text);
    text-decoration: underline;
    text-underline-offset: 4px;

    transform-style: preserve-3d;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .back {
    z-index: 1;
    opacity: 0;
    color: var(--color-hover-purple);
    padding-top: 3px;

    /* ✅ sem rotateX(180deg) */
    transform: none;

    pointer-events: none;

    backface-visibility: visible;
    -webkit-backface-visibility: visible;

    canvas {
      transform: translateZ(0);
      backface-visibility: visible;
      -webkit-backface-visibility: visible;
    }
  }

  &:hover .front,
  &:focus-visible .front {
    color: var(--color-hover-purple);
    animation: ${frontFlip} 0.6s ease-in-out forwards;
  }

  &:hover .back,
  &:focus-visible .back {
    animation: ${backPulse} 0.6s ease-in-out forwards;
  }
`;