import styled, { keyframes } from "styled-components";

/* Definição da animação de rotação em 360 graus */
const flipAndBack = keyframes`
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(180deg); } 
  100% { transform: rotateX(360deg); }
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
    /* Transição base reduzida para 0.4s */
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    min-width: 110px;
    height: 1.2em;
    text-align: center;
  }

  .front,
  .back {
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
    font-family: var(--font-witchcraft);
    color: var(--color-hover-purple);
    font-size: 1.1em;
    padding-top: 3px;
    transform: rotateX(180deg);
  }

  /* Disparo da animação acelerada para 0.6s conforme especificação técnica de melhoria de performance visual */
  &:hover .flip-container {
    animation: ${flipAndBack} 0.6s ease-in-out forwards;
  }

  &:hover .front {
    color: var(--color-hover-purple);
    /* Transição de cor ajustada para 0.3s */
    transition-delay: 0.3s;
  }
`;