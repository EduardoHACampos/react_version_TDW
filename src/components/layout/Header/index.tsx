import { useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";

// IMAGENS IMPORTADAS
import logo from "../../../assets/TDWLOGO_NoWood.png";
import barsIcon from "../../../assets/bars.svg";
import xmarkIcon from "../../../assets/xmark.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <Link to="/" onClick={closeMenu}>
          <S.Logo src={logo} alt="The Dark West Logo" />
        </Link>
        <S.Nav isOpen={isMenuOpen}>
          <S.StyledNavLink to="/the-goal" onClick={closeMenu}>
            THE GOAL
          </S.StyledNavLink>
          <S.StyledNavLink to="/opportunities" onClick={closeMenu}>
            OPPORTUNITIES
          </S.StyledNavLink>
          <S.StyledNavLink to="/contact" onClick={closeMenu}>
            CONTACT
          </S.StyledNavLink>
        </S.Nav>
        <S.MenuToggle onClick={toggleMenu}>
          <img src={isMenuOpen ? xmarkIcon : barsIcon} alt="Menu Icon" />
        </S.MenuToggle>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};

export default Header;
