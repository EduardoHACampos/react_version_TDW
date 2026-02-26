import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";

/**
 * Mesmo comportamento do site oficial:
 * hover é transitório (runa só durante a animação).
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
  perspective: 1000px;

  .flip-container {
    position: relative;
    display: inline-block;
    transform-style: preserve-3d;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
  }

  .front,
  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    white-space: nowrap;
  }

  .front {
    position: relative;
    z-index: 2;
    font-family: var(--font-primary);
    color: var(--color-primary-text);
    font-weight: bold;
    transform: rotateX(0deg);
    transition: color 0.3s, text-shadow 0.3s;
  }

  .back {
    position: absolute;
    inset: 0;
    color: var(--color-hover-purple);
    font-size: 1.1em;
    padding-top: 3px;
    transform: rotateX(180deg);
    opacity: 0;
    will-change: transform, opacity;
  }

  &:hover .flip-container,
  &:focus-visible .flip-container {
    animation: ${hoverFlipFromRunesToText} 0.6s ease-in-out forwards;
  }

  &:hover .front,
  &:focus-visible .front {
    color: var(--color-hover-purple);
    text-shadow: 0 0 8px rgba(167, 150, 255, 0.25);
    animation: ${frontAppearAtEnd} 0.6s ease-in-out forwards;
  }

  &:hover .back,
  &:focus-visible .back {
    opacity: 1;
    animation: ${backDisappearAtEnd} 0.6s ease-in-out forwards;
  }

  .back canvas {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    will-change: transform;
    transform: translateZ(0);
    display: block;
    margin: 0 auto;
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