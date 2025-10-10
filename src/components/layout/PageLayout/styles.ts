import styled from "styled-components";

export const MainContent = styled.main<{ bgImage: string }>`
  flex: 1;
  background-image: url(${({ bgImage }) => bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
