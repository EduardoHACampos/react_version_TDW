import styled, { keyframes } from "styled-components";

const flipAndBack = keyframes`
  0%   { transform: rotateX(0deg); }
  50%  { transform: rotateX(180deg); }
  100% { transform: rotateX(0deg); }
`;

const frontTransient = keyframes`
  0%   { opacity: 1; }
  40%  { opacity: 1; }
  41%  { opacity: 0; }
  84%  { opacity: 0; }
  85%  { opacity: 1; }
  100% { opacity: 1; }
`;

const runeTransient = keyframes`
  0%   { opacity: 1; }
  70%  { opacity: 1; }
  100% { opacity: 0; }
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

  perspective: 1000px;

  .flip-container {
    position: relative;
    display: inline-grid;
    place-items: center;

    min-width: 110px;
    height: 1.2em;

    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;

    will-change: transform;
    overflow: visible;
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
    font-weight: bold;
    color: var(--color-primary-text);
    text-decoration: underline;
    text-underline-offset: 4px;

    transform: rotateX(0deg);
  }

  .back {
    z-index: 1;
    transform: rotateX(180deg);
    color: var(--color-hover-purple);
    padding-top: 3px;
    pointer-events: none;

    opacity: 0;

    canvas {
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
  }

  &:hover .back,
  &:focus-visible .back {
    opacity: 1;
    animation: ${runeTransient} 0.6s steps(1, end) both;
  }
`;