import styled, { keyframes } from "styled-components";

/**
 * Mesmo comportamento do Header:
 * Hover começa em RUNAS e termina em TEXTO (hovered, roxo, legível).
 */
const hoverFlipFromRunesToText = keyframes`
  0%   { transform: rotateX(180deg); }
  100% { transform: rotateX(360deg); }
`;

const frontAppearAtEnd = keyframes`
  0%   { opacity: 0; }
  55%  { opacity: 0; }
  100% { opacity: 1; }
`;

const backDisappearAtEnd = keyframes`
  0%   { opacity: 1; }
  55%  { opacity: 1; }
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
  perspective: 1000px;
  margin: 0 5px;

  .flip-container {
    position: relative;
    display: inline-block;
    transform-style: preserve-3d;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    min-width: 110px;
    height: 1.2em;
    text-align: center;
    overflow: hidden;
  }

  .front,
  .back {
    position: absolute;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    white-space: nowrap;
    transition: color 0.3s;
  }

  .front {
    font-family: var(--font-primary);
    font-weight: bold;
    color: var(--color-primary-text);

    text-decoration: underline;
    text-underline-offset: 4px;
    transform: rotateX(0deg);
  }

  .back {
    color: var(--color-hover-purple);
    font-size: 1.1em;
    padding-top: 3px;
    transform: rotateX(180deg);
    opacity: 0;
    will-change: transform, opacity;

    canvas {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      will-change: transform;
      transform: translateZ(0);
    }
  }

  &:hover .flip-container,
  &:focus-visible .flip-container {
    animation: ${hoverFlipFromRunesToText} 0.6s ease-in-out forwards;
  }

  &:hover .front,
  &:focus-visible .front {
    color: var(--color-hover-purple);
    animation: ${frontAppearAtEnd} 0.6s ease-in-out forwards;
  }

  &:hover .back,
  &:focus-visible .back {
    opacity: 1;
    animation: ${backDisappearAtEnd} 0.6s ease-in-out forwards;
  }
`;