import styled from "styled-components";
import buttonBg from "../../../assets/button01edited.png";

export const CustomButton = styled.button`
  background-image: url(${buttonBg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  background-color: transparent;
  cursor: pointer;

  font-family: var(--font-special);
  color: #ffffffff;
  font-size: var(--font-size-lg);
  transition: transform 0.2s ease-in-out;
  margin: 0 auto;

  width: 150px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    filter: grayscale(80%);
    cursor: not-allowed;
    transform: scale(1);
  }
  @media (min-width: 2540px) {
    width: 210px;
    height: 120px;
    font-size:1.75rem;
  }
`;
