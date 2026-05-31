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
    radial-gradient(circle, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.7) 100%), 
    url(${heroBackground});
  background-size: cover;
  background-position: 80% center;
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

export const CountdownPanel = styled.section`
  position: relative;
  width: min(100%, 760px);
  min-height: 94px;
  margin-top: 0.15rem;
  display: grid;
  place-items: center;
  isolation: isolate;
  filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.72));

  @media (max-width: 640px) {
    width: min(100%, 440px);
    min-height: 88px;
    margin-top: -0.1rem;
  }

  @media (max-width: 430px) {
    width: 100%;
    min-height: 84px;
    margin-top: -0.05rem;
  }
`;

export const CountdownFrame = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

export const CountdownContent = styled.div`
  position: relative;
  z-index: 1;
  width: min(100% - 2.2rem, 600px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 1rem 0.44rem;

  @media (max-width: 640px) {
    width: min(100% - 1.2rem, 372px);
    padding: 0 0.55rem 0.4rem;
  }

  @media (max-width: 430px) {
    width: calc(100% - 0.95rem);
    padding: 0 0.4rem 0.36rem;
  }
`;

export const CountdownEyebrow = styled.span`
  color: rgba(240, 199, 118, 0.86);
  font-family: var(--font-primary);
  font-size: clamp(0.76rem, 1.25vw, 0.92rem);
  font-weight: 700;
  letter-spacing: 0.16em;
  line-height: 1.3;
  text-transform: uppercase;
  text-shadow: 0 0 8px rgba(208, 142, 38, 0.32);

  @media (max-width: 640px) {
    font-size: 0.66rem;
    letter-spacing: 0.09em;
  }

  @media (max-width: 430px) {
    font-size: 0.58rem;
    letter-spacing: 0.06em;
  }
`;

export const CountdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  width: 100%;
  margin-top: 0.06rem;

  @media (max-width: 640px) {
    margin-top: 0.04rem;
  }
`;

export const CountdownUnit = styled.div`
  position: relative;
  min-width: 0;
  min-height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.2rem 0;

  @media (max-width: 640px) {
    min-height: 43px;
    padding-top: 0.42rem;
  }

  @media (max-width: 430px) {
    min-height: 39px;
    padding-inline: 0.05rem;
    padding-top: 0.34rem;
  }
`;

export const CountdownValue = styled.span`
  color: #e8bf65;
  font-family: var(--font-heading);
  font-size: clamp(1.6rem, 3.2vw, 2.35rem);
  font-weight: 400;
  line-height: 0.78;
  letter-spacing: 0;
  text-shadow:
    0 0 8px rgba(208, 142, 38, 0.26),
    0 2px 0 rgba(0, 0, 0, 0.9);
  font-variant-numeric: tabular-nums;

  @media (max-width: 640px) {
    font-size: clamp(1.35rem, 6.7vw, 1.9rem);
  }

  @media (max-width: 430px) {
    font-size: clamp(1.1rem, 7.3vw, 1.52rem);
  }
`;

export const CountdownLabel = styled.span`
  margin-top: 0.2rem;
  color: rgba(255, 236, 190, 0.92);
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.9);

  @media (max-width: 640px) {
    font-size: 0.62rem;
  }

  @media (max-width: 430px) {
    font-size: 0.46rem;
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
  padding-bottom: 1.45rem;
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
    width: 48px;
    height: 48px;
    filter: brightness(0.9);
  }

  &.newsletter-icon {
    width: 36px;
    height: 36px;
    filter: brightness(0.9);
  }
`;

const highlightHoverEffect = css`
  &:hover {
    opacity: 1;
    transform: scale(1.05);
    
    background: linear-gradient(
      to right,
      var(--color-gradient-start, #fceabb),
      var(--color-gradient-middle, #f8b500),
      var(--color-gradient-end, #fceabb)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    
    filter: drop-shadow(0 0 4px rgba(248, 181, 0, 0.3));

    img {
      filter: drop-shadow(0 0 5px rgba(248, 181, 0, 0.5)) brightness(1.05);
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

export const ModalModeButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: var(--color-hover-purple);
  font-family: var(--font-primary);
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`;

export const FloatingTwitchContainer = styled.aside`
  display: none; 

  @media (min-width: 1400px) {
    display: flex;
    flex-direction: column;
    
    position: fixed;
    left: 2rem;
    bottom: 2rem;
    z-index: 50; 
    
    background: rgba(15, 15, 20, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 1.2rem;
    border-radius: 12px;
    border: 1px solid rgba(167, 150, 255, 0.3);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
    transition: opacity 0.3s ease;
  }
`;

export const TwitchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(167, 150, 255, 0.2);
  padding-bottom: 0.5rem;
`;

export const FloatingStreamTitle = styled.h4`
  color: #fff;
  font-family: var(--font-primary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  display: block;

  &::before {
    display: none; 
  }
`;

export const CloseTwitchButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.8rem;
  line-height: 0.8;
  padding: 0;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: var(--color-hover-purple);
    transform: scale(1.1);
  }
`;

export const FloatingStreamWrapper = styled.div`
  width: 320px; 
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(167, 150, 255, 0.2); 
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: var(--color-hover-purple); 
    box-shadow: 0 0 15px rgba(167, 150, 255, 0.25);
  }
`;

export const IframeWrapper = styled.div`
  width: 100%;
  height: 220px; 
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
`;
