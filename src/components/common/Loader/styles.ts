import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
`;

export const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999; 

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

export const LoaderImage = styled.img`
  width: 150px;
  animation: ${pulse} 2s infinite ease-in-out;
`;
