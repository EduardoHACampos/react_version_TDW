import styled from "styled-components";
import heroBackground from "../../assets/KeyartTheDarkWestFinalFasepaintover.png";

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

  background-image: radial-gradient(
      circle,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.7) 100%
    ),
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

  &:hover {
    filter: brightness(1.3);
  }

  a {
    font-family: var(--font-accent); 
    font-size: var(--font-size-xxl); 
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;

    background: linear-gradient(
      to right,
      var(--color-gradient-start),
      var(--color-gradient-middle),
      var(--color-gradient-end)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 3px;
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
