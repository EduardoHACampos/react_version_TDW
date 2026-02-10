import styled from "styled-components";

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

// Transformamos o Link simples em um Container 3D
export const ModalTrigger = styled.span`
  display: inline-flex; /* Inline-flex para ficar no meio do texto */
  align-items: center;
  justify-content: center;
  vertical-align: middle; /* Alinha com o texto ao redor */

  cursor: pointer;
  position: relative;
  perspective: 1000px;

  /* Ajuste de margem se necessário para não colar nas palavras vizinhas */
  margin: 0 5px;

  /* --- O CONTAINER QUE GIRA --- */
  .flip-container {
    position: relative;
    display: inline-block;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    /* Largura automática baseada no conteúdo, mas com min-width para evitar pulos */
    min-width: 100px;
    height: 1.2em; /* Altura da linha do texto */
  }

  /* --- FACES (FRENTE E VERSO) --- */
  .front,
  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    font-weight: bold;
    font-size: 1.1em; /* Um pouco maior que o texto normal para destaque */
    white-space: nowrap;

    transition:
      color 0.3s,
      text-shadow 0.3s;
  }

  /* --- FRENTE (INGLÊS) --- */
  .front {
    position: absolute; /* Absolute para sobrepor */
    top: 0;
    left: 0;

    font-family: var(--font-heading); /* Rye */
    color: var(--color-primary-text); /* Dourado */
    text-decoration: underline; /* Mantém o sublinhado original se quiser, ou remove */
    text-underline-offset: 4px;

    transform: rotateX(0deg);
  }

  /* --- VERSO (RUNAS) --- */
  .back {
    position: absolute;
    top: 0;
    left: 0;

    font-family: var(--font-witchcraft); /* Runas */
    color: var(--color-hover-purple); /* Roxo */

    transform: rotateX(180deg);

    /* Ajustes visuais para Runas */
    font-size: 1.2em;
    padding-top: 2px;
  }

  /* --- HOVER --- */
  &:hover .flip-container {
    transform: rotateX(180deg);
  }

  &:hover .front {
    color: var(--color-hover-purple);
  }
`;
