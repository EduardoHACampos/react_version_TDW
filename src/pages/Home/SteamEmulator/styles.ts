/*
 English: 
 Styles for the Steam Emulator section on the Home page.
 This section replicates the "About This Game" and "Early Access" look from Steam, accommodating the heavy GIFs and text interleaving.
 
 Explicação em português aqui: 
 Estilos para a seção do Emulador da Steam na página inicial.
 Esta seção replica o visual de "Sobre Este Jogo" e "Acesso Antecipado" da Steam, acomodando os GIFs pesados e a intercalação de texto.
 
 Caminho / Path: src/components/home/SteamEmulator/styles.ts
*/

import styled from "styled-components";

export const SteamSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--color-background-dark);
  padding: 4rem 1.5rem;
`;

export const SteamWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SectionHeader = styled.h2`
  font-family: var(--font-primary);
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  
  /* English: Classic Steam blue underline / Explicação em português aqui: Sublinhado azul clássico da Steam */
  border-bottom: 2px solid #2a475e; 
  padding-bottom: 0.5rem;
`;

export const Paragraph = styled.p`
  font-family: var(--font-primary);
  color: #acb2b8; /* Steam text color / Cor do texto da Steam */
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;

  strong {
    color: #66c0f4; /* Steam highlight color / Cor de destaque da Steam */
  }
`;

export const GifImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  margin: 1rem 0;
  /* English: Subtle border to match Steam store media / Explicação em português aqui: Borda sutil para combinar com a mídia da loja Steam */
  border: 1px solid rgba(255, 255, 255, 0.1); 
`;

export const EarlyAccessBox = styled.div`
  background-color: rgba(42, 71, 94, 0.4);
  border: 1px solid #2a475e;
  border-radius: 4px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const EarlyAccessHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-family: var(--font-primary);
    color: #fff;
    font-size: 1.4rem;
    margin: 0;
  }

  p {
    font-family: var(--font-primary);
    color: #acb2b8;
    font-size: 1rem;
    font-style: italic;
    margin: 0;
  }
`;

export const QAItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h4 {
    font-family: var(--font-primary);
    color: #66c0f4;
    font-size: 1.1rem;
    margin: 0;
  }

  p {
    font-family: var(--font-primary);
    color: #acb2b8;
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
  }
`;