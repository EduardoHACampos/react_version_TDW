/*
 English: 
 Complete styles for the Home page (Single-screen landing page).
 Includes all original containers, the video wrapper, and the new bottom action links with GOLDEN hover effects.
 The links are now visible by default (light grey) and glow gold on hover.
 
 Explicação em português aqui: 
 Estilos completos para a página Home (Landing page de ecrã único).
 Inclui todos os contentores originais, o wrapper do vídeo e os novos links de ação inferiores com efeitos de hover DOURADO.
 Os links estão agora visíveis por defeito (cinzento claro) e brilham em dourado ao passar o rato.
*/

import styled, { css } from "styled-components";
import heroBackground from "../../assets/KeyartTheDarkWestFinalFasepaintover.png";

export const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 80px; /* Header Offset / Compensação do Header */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const HeroSection = styled.section`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 3rem 1rem; 

  @media (min-width: 1024px) {
    padding: 3rem 2rem; 
  }

  background-image:
    radial-gradient(circle, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.8) 100%),
    url(${heroBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const MainTitle = styled.img`
  max-width: 280px;
  width: 100%;
  margin-bottom: 2.5rem;
  
  @media (min-width: 768px) {
    max-width: 350px;
    margin-bottom: 3.5rem;
  }
`;

export const VideoWrapper = styled.div`
  width: 100%;
  max-width: 640px;
  aspect-ratio: 16 / 9;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(167, 150, 255, 0.2);
  margin-bottom: 2rem;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (min-width: 1024px) {
    max-width: 760px;
  }
`;

export const HuntButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem; 

  .hunt-rune-action {
    width: auto;
    height: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    perspective: 1000px;
    transform-style: preserve-3d;
    filter: drop-shadow(0 0 8px var(--color-gold-shadow));
    transition: transform 0.3s ease, filter 0.3s ease;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    will-change: transform;
    transform: translateZ(0);
  }

  .hunt-rune-action:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 15px var(--color-gold-shadow));
  }

  .hunt-rune-action .flip-container {
    position: relative;
    display: inline-block;
    width: 280px;
    height: 50px;
    transform-style: preserve-3d;
    will-change: transform;
    transform-origin: center;
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: visible;

    @media (min-width: 375px) {
      width: 320px;
    }
    @media (min-width: 768px) {
      width: 400px;
    }
  }

  .hunt-rune-action .front,
  .hunt-rune-action .back {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 3px;
    white-space: nowrap;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transform: translateZ(0);
  }

  .hunt-rune-action .front {
    font-family: var(--font-heading);
    font-size: var(--font-size-xl);
    transform: rotateX(0deg);
    background: linear-gradient(
      to right,
      var(--color-gradient-start),
      var(--color-gradient-middle),
      var(--color-gradient-end)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 6px var(--color-gold-shadow));
    transition: background 0.3s ease, filter 0.3s ease;
  }

  .hunt-rune-action .back {
    transform: rotateX(180deg);
    padding-top: 3px;
    color: var(--color-hover-purple);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    will-change: transform;

    canvas {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      will-change: transform;
      transform: translateZ(0);
    }
  }

  .hunt-rune-action:hover .front {
    background: linear-gradient(
      to right,
      var(--color-hover-purple),
      #c4b5fd
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    transition-delay: 0.4s;
  }

  @media (min-width: 768px) {
    .hunt-rune-action .front {
      font-size: var(--font-size-xxl);
    }
  }
`;

export const BottomActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: auto; 
  padding-bottom: 2rem;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 3rem;
  }
`;

export const ActionIcon = styled.img`
  display: block;
  object-fit: contain;
  transition: transform 0.3s ease, filter 0.3s ease;
  
  &.steam-icon {
    width: 120px;
    height: 65px;
    filter: brightness(0.9);
  }

  &.discord-icon {
    width: 48px; /* Tamanho original proporcional ao da Steam / Original size proportional to Steam */
    height: 48px;
    filter: brightness(0.9);
  }

  &.newsletter-icon {
    width: 36px; /* Ajustado para acompanhar os outros / Adjusted to match the others */
    height: 36px;
    filter: brightness(0.9);
  }
`;

const highlightHoverEffect = css`
  &:hover {
    opacity: 1;
    transform: scale(1.05);
    
    /* English: GOLD gradient for text on hover / Explicação em português aqui: Gradiente DOURADO para o texto no hover */
    background: linear-gradient(
      to right,
      var(--color-gradient-start, #fceabb),
      var(--color-gradient-middle, #f8b500),
      var(--color-gradient-end, #fceabb)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 10px var(--color-gold-shadow));

    /* English: Golden tint for the icons on hover / Explicação em português aqui: Tom dourado para os ícones no hover */
    img {
      filter: drop-shadow(0 0 10px var(--color-gold-shadow)) brightness(1.2) sepia(1) hue-rotate(35deg) saturate(3);
    }
  }
`;

const actionTextStructure = css`
  display: flex;
  align-items: center;
  gap: 0.75rem; 
  font-family: var(--font-heading);
  font-size: 1.1rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  
  /* English: Default visible state (White/Grey) / Explicação em português aqui: Estado visível por defeito (Branco/Cinzento) */
  color: #c7d5e0; 
  background: none;
  -webkit-text-fill-color: initial;
  filter: none;
  opacity: 0.85; 
  
  transition: transform 0.3s ease, filter 0.3s ease, background 0.3s ease, opacity 0.3s ease, color 0.3s ease;

  ${highlightHoverEffect}

  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const ActionLink = styled.a`
  ${actionTextStructure}
  text-decoration: none;
`;

export const ActionButton = styled.button`
  ${actionTextStructure}
  background: none;
  border: none;
  padding: 0;
  outline: none;
`;