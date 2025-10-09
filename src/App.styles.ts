import styled from "styled-components";


export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
`;

export const MainContent = styled.main<{ bgImage: string }>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  background-image: radial-gradient(
      circle,
      rgba(0, 0, 0, 0.1) 40%,
      rgba(0, 0, 0, 1) 100%
    ),
    url(${({ bgImage }) => bgImage});
  background-size: cover;
  background-position: 65% 50px;
  background-repeat: no-repeat;
`;
