import styled from "styled-components";

// Container principal com a imagem de fundo correta
export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;


  background-size: cover;
  background-position: center;
  margin:70px 0;

  @media(min-width: 768px) {
    justify-content: flex-start
    
  }
`;

// Wrapper para todo o conteúdo, com fundo semi-transparente para legibilidade
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: var(--border-radius-md);
  max-width: 800px;
  width: 420px;
  gap: var(--spacing-lg);

  @media (min-width: 768px) {
    width: 700px;
  }
`;


export const DividerImage = styled.img`
  width: 100%;
  max-width: 300px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);

  @media (min-width: 768px) {
    flex-direction: row; /* Lado a lado em telas maiores */
    justify-content: center;
  }
`;
