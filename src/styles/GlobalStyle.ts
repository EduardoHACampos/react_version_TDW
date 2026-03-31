import { createGlobalStyle } from "styled-components";

/**
 * Armazena o conteúdo Base64 da fonte em uma constante separada para melhorar a legibilidade e manutenção.
 * Stores the font's Base64 content in a separate constant to improve readability and maintenance.
 */

export const GlobalStyle = createGlobalStyle`
  /* 1. IMPORTANDO AS FONTES DO GOOGLE */
  @import url('https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Rye&display=swap');

  :root {
    --font-primary: 'Baskervville', serif; 
    --font-heading: 'Rye', serif;
    --font-witchcraft: 'Witchcraft', serif;
    /* --- CORES (Já atualizadas) --- */
    --color-background-dark: #000000;
    --color-background-medium: #121212;
    --color-background-card: #1a1a1a;
    
    /* Dourado Títulos */
    --color-primary-text: #ffdd96; 
    
    /* Creme Textos */
    --color-text-light: #fff4df; 
    
    /* Roxo Hover */
    --color-hover-purple: #a796ff;

    --color-border: #333333;
    
    /* Começa num dourado mais escuro/bronze */
    --color-gradient-start: #c7a04c; 
    
    /* O meio é o dourado brilhante da paleta */
    --color-gradient-middle: #ffdd96; 
    
    /* Termina no dourado mais escuro */
    --color-gradient-end: #c7a04c;

    /* Nova variável para a sombra/brilho dourado */
    --color-gold-shadow: rgba(255, 221, 150, 0.5); 


    /* --- FONTES (Continuam iguais) --- */
    --font-primary: 'Baskervville', serif; 
    --font-heading: 'Rye', serif;
    --font-special: 'Rye', serif;
    /* Certifique-se que a fonte Witchcraft está configurada aqui */
    --font-witchcraft: 'Witchcraft', serif;
    /* O botão agora usará a Witchcraft */
    --font-accent: 'Witchcraft', serif;

    /* --- TAMANHOS --- */
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.875rem;
    --font-size-xxl: 2.25rem;
    --font-size-display: 3rem;

    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 32px;
    --spacing-xl: 48px;

    --border-radius-md: 8px;
  }

  html {
    font-size: 16px; 
  }
* {
    box-sizing: border-box; /* Essencial para que padding/border não quebrem o width */
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden; /* Corta qualquer transbordo acidental à direita */
    position: relative;
  }

  #root {
    width: 100%;
    overflow-x: hidden;
  }
  body {
    background-color: var(--color-background-dark);
    color: var(--color-text-light); /* Agora usa o Creme (#fff4df) */
    font-family: var(--font-primary);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    color: var(--color-primary-text); /* Agora usa o Dourado (#ffdd96) */
  }

  @media (min-width: 2560px) {
    html {
      font-size: 20px;
    }
  }

  /* React Toastify styles */
  .Toastify__toast-theme--dark {
    background-color: var(--color-background-medium);
    color: var(--color-text-light);
    font-family: var(--font-primary);
  }
`;
