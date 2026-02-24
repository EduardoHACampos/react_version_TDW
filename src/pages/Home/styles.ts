import styled, { keyframes } from "styled-components";
import heroBackground from "../../assets/KeyartTheDarkWestFinalFasepaintover.png";

const flipAndBack = keyframes`
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(180deg); }
  100% { transform: rotateX(360deg); }
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
  height: 800px;
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

export const HuntButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: rgb(0 0 0 / 50%);
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: var(--spacing-sm);

  a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    perspective: 1000px;
    transition:
      transform 0.3s,
      filter 0.3s;
    filter: drop-shadow(0 0 8px var(--color-gold-shadow));
    transform: translateZ(0);
  }

  a .flip-container {
    position: relative;
    display: inline-block;
    width: 280px; /* Reduzido de 350px para caber em 320px com margens */
    height: 50px;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    will-change: transform;

    @media (min-width: 375px) {
      width: 320px; /* Aumenta ligeiramente em telemóveis maiores */
    }

    @media (min-width: 768px) {
      width: 400px; /* Largura original para desktop */
    }
  }

  a .front,
  a .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
    transform: translateZ(0.1px);

    transition: background-image 0.3s;
  }

  a .front {
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
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  a .back {
    font-family: var(--font-witchcraft);
    font-size: 2rem;
    padding-top: 5px;
    transform: rotateX(180deg);

    background: var(--color-hover-purple);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  a:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 15px var(--color-gold-shadow));
  }

  /* Ciclo de animação configurado para 0.6s para aumentar o dinamismo visual */
  a:hover .flip-container {
    animation: ${flipAndBack} 0.6s ease-in-out forwards;
  }

  a:hover .front {
    background-image: linear-gradient(
      to right,
      var(--color-hover-purple),
      #c4b5fd
    );
    /* Transição de cor sincronizada com o ponto médio da rotação (0.4s) */
    transition-delay: 0.4s;
  }

  @media (min-width: 768px) {
    a .front {
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
  height: 560px;
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