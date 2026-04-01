import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

export const SkeletonWrapper = styled.div<{ width?: string; height?: string }>`
  position: relative;
  overflow: hidden;
  background-color: #333; 
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "20px"};
  border-radius: 4px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.1) 20%,
      rgba(255, 255, 255, 0.3) 60%,
      rgba(255, 255, 255, 0)
    );
    animation: ${shimmer} 2s infinite;
  }
`;
