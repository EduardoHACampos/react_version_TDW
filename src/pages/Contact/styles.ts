import styled, { keyframes } from "styled-components";

/* 👇 Animação de "Girar e Voltar" (Igual ao Header/Home) */
const flipAndBack = keyframes`
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(180deg); } /* Mostra Runas */
  100% { transform: rotateX(360deg); } /* Volta para Inglês */
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
  vertical-align: bottom; /* Alinha melhor com o texto ao redor */

  cursor: pointer;
  position: relative;
  perspective: 1000px;
  margin: 0 5px;

  /* --- O CONTAINER QUE GIRA --- */
  .flip-container {
    position: relative;
    display: inline-block;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    /* Largura mínima para evitar que o texto balance ao trocar de fonte */
    min-width: 110px;
    height: 1.2em;
    text-align: center;
  }

  /* --- FACES (FRENTE E VERSO) --- */
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

  /* --- FRENTE (INGLÊS) --- */
  .front {
    /* Agora usa Baskervville para consistência de legibilidade */
    font-family: var(--font-primary);
    font-weight: bold;
    color: var(--color-primary-text);

    text-decoration: underline;
    text-underline-offset: 4px;
    transform: rotateX(0deg);
  }

  /* --- VERSO (RUNAS) --- */
  .back {
    font-family: var(--font-witchcraft);
    color: var(--color-hover-purple);
    font-size: 1.1em;
    padding-top: 3px;
    transform: rotateX(180deg);
  }

  /* --- HOVER EFFECTS --- */

  /* Dispara a animação Flip & Back */
  &:hover .flip-container {
    animation: ${flipAndBack} 0.9s ease-in-out forwards;
  }

  /* Muda a cor da frente para Roxo na metade da animação */
  &:hover .front {
    color: var(--color-hover-purple);
    transition-delay: 0.45s;
  }
`;
