import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderContainer = styled.header`
  background-color: var(--color-background-dark);
  border-bottom: none;
  padding: 1rem 5%;
  position: fixed;
  top: 0;

  /* --- ALTERAÇÃO APLICADA AQUI --- */
  /* Estica o header de ponta a ponta, ignorando a barra de rolagem */
  left: 0;
  right: 0;

  /* A propriedade 'width: 100%' foi removida, pois não é mais necessária */

  z-index: 1000;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: 2560px) {
    max-width: 1800px;
  }
`;

export const Logo = styled.img`
  height: 60px;
`;

export const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: var(--color-background-dark);
    padding: 1rem 0;
    text-align: center;
  }
`;

export const StyledNavLink = styled(NavLink)`
  font-family: var(--font-special);
  font-size: 1.5rem;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
  transition: color 0.3s, border-color 0.3s, background 0.3s;

  background: linear-gradient(
    to right,
    var(--color-gradient-start),
    var(--color-gradient-middle),
    var(--color-gradient-end)
  );
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;

  &:hover,
  &.active {
    background: none;
    -webkit-background-clip: initial;
    -moz-background-clip: initial;
    background-clip: initial;
    -webkit-text-fill-color: var(--color-text-light);
    -moz-text-fill-color: var(--color-text-light);

    border-color: var(--color-text-light);
  }

  &.active {
    font-weight: bold;
  }
`;

export const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;
