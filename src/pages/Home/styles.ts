import styled, { keyframes } from "styled-components";
import heroBackground from "../../assets/KeyartTheDarkWestFinalFasepaintover.png";
import buttonBg from "../../assets/button01edited.png";

const flipAndBack = keyframes`
  0%   { transform: rotateX(0deg); }
  50%  { transform: rotateX(180deg); }
  100% { transform: rotateX(0deg); }
`;

export const HomeContainer = styled.div`
  width: 100%;
  padding-top: 80px;
`;

export const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(-80px + 100vh);
  min-height: 600px;
  gap: var(--spacing-lg);
  background-image:
    radial-gradient(circle, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.7) 100%),
    url(${heroBackground});
  background-size: cover;
  background-position: 80%;
  background-repeat: no-repeat;
  justify-content: space-between;
  @media (min-width: 2560px) {
    height: 1100px;
  }
`;

export const MainTitle = styled.img`
  max-width: 420px;
  width: calc(100% - 32px);
  margin: 0 auto;
  text-align: center;
  padding: 2rem 0;
`;

/**
 * Rune Animation Wrapper / Wrapper de Animação das Runas
 * Controls the reveal effect of the canvas / Controla o efeito de revelação do canvas
 */
export const RuneWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  perspective: 1000px; /* Essential for the Canvas internal rotation / Essencial para a rotação interna do Canvas */
`;

export const HuntButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: rgb(0 0 0 / 50%);
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: var(--spacing-sm);

  /* O RuneAction renderiza um <button> com essa className */
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

    /* ✅ flip 3D real */
    perspective: 1000px;
    transform-style: preserve-3d;

    filter: drop-shadow(0 0 8px var(--color-gold-shadow));
    transition:
      transform 0.3s ease,
      filter 0.3s ease;

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

    transition: transform 0.6s
      cubic-bezier(0.175, 0.885, 0.32, 1.275);

    /* ✅ evita “cortar” o 3D no meio */
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
    transition:
      background 0.3s ease,
      filter 0.3s ease;
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

export const PlatformContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: var(--spacing-md);
  margin-bottom: 2rem;
  gap: 2rem;
  img {
    display: block;
    object-fit: contain;
    width: 120px;
    height: 65px;
  }
  a:nth-child(2) img {
    width: 48px;
    height: 48px;
  }
`;

export const TrailerSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 615px;
  padding: 3rem 0;
  background: var(--color-background-dark);
  .trailer-video {
    width: 100%;
    max-width: 320px;
    height: 180px;
    border-radius: var(--border-radius-md);
    @media (min-width: 768px) {
      max-width: 600px;
      height: 338px;
    }
    @media (min-width: 1024px) {
      max-width: 900px;
      height: 506px;
    }
  }
`;