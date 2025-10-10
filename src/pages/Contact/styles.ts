import styled from "styled-components";

// Container principal da página, com layout flex e responsivo
export const PageContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-top:30px;
  height:100vh;
  /* No mobile, o conteúdo é centralizado */
  justify-content: center;
  /* No desktop, o conteúdo é alinhado à direita */
  @media (min-width: 1024px) {
    justify-content: flex-end;
  }
`;

// Estilo para o texto/link que aciona o modal
export const ModalTrigger = styled.a`
  color: var(--color-gradient-middle); 
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
  transition: transform 0.2s;

  &:hover {
    text-decoration: underline;
    transform: scale(1.1);
  }
`;
