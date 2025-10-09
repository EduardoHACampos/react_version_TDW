import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Cores */
    --color-background-dark: #000000;
    --color-background-medium: #121212;
    --color-background-card: #1a1a1a;
    --color-primary-text: #8C8A87;
    --color-text-light: #FFFFFF;
    --color-border: #333333;
    
    /* Cores do Gradiente */
    --color-gradient-start: #830101;
    --color-gradient-middle: #B22222;
    --color-gradient-end: #830101;

    /* Fontes */
    --font-primary: 'Kirsty', sans-serif;
    --font-heading: 'Saddlebag', sans-serif;
    --font-special: 'Bonzer', sans-serif;
    --font-accent: 'Rio Oro', sans-serif;

    /* Tamanhos de Fonte */
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.875rem;
    --font-size-xxl: 2.25rem;
    --font-size-display: 3rem;

    /* Espaçamentos */
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 32px;
    --spacing-xl: 48px;

    /* Border Radius */
    --border-radius-md: 8px;
  }

  
  html {
    font-size: 16px; 
  }

  body {
    background-color: var(--color-background-dark);
    color: var(--color-text-light);
    font-family: var(--font-primary);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @media (min-width: 2560px) {
    html {
      font-size: 20px;
    }

    :root {
      --spacing-sm: 12px;
      --spacing-md: 24px;
      --spacing-lg: 48px;
      --spacing-xl: 72px;
    }
  }

  /* Font Faces */
  @font-face {
    font-family: 'Bonzer';
    src: url('/fonts/Bonzer - San Francisco.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Kirsty';
    src: url('/fonts/Kirsty Rg.otf') format('opentype');
  }
  @font-face {
    font-family: 'NASHVILL';
    src: url('/fonts/NASHVILL.TTF') format('truetype');
  }
  @font-face {
    font-family: 'Rio Oro';
    src: url('/fonts/Rio Oro.otf') format('opentype');
  }
  @font-face {
    font-family: 'Saddlebag';
    src: url('/fonts/Saddlebag.ttf') format('truetype');
  }

  /* Estilos para o React-Toastify */
  .Toastify__toast-theme--dark {
    background-color: var(--color-background-medium);
    color: var(--color-text-light);
    font-family: var(--font-primary);
  }
  .Toastify__close-button {
    color: var(--color-text-light);
  }
`;