import styled from "styled-components";
import buttonBg from "../../../assets/button01edited.png";

export const CustomButton = styled.button`
  width: 160px;
  height: 100px;
  font-size: 1rem;

  background-image: url(${buttonBg});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  padding: 0 10px;
  padding-bottom: 4px;

  font-family: var(--font-heading); 
  color: var(--color-primary-text); 
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8); 
  font-weight: normal;
  letter-spacing: 1px;

  transition:
    transform 0.2s ease-in-out,
    filter 0.2s,
    width 0.3s,
    height 0.3s,
    font-size 0.3s;

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 5px var(--color-gold-shadow));
    color: var(--color-hover-purple);
  }

  &:disabled {
    filter: grayscale(80%);
    cursor: not-allowed;
    transform: scale(1);
    opacity: 0.7;
  }


  @media (min-width: 1024px) {
    width: 200px;
    height: 100px;
    font-size: 1.2rem;
  }
  @media (min-width: 2560px) {
    width: 320px;
    height: 150px;
    font-size: 1.5rem;
  }
`;
