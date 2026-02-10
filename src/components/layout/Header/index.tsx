import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePreloader } from "../../../hooks/usePreloader";
import * as S from "./styles";

import logo from "../../../assets/TheDarkWest_TextWithFlourish.png";
import barsIcon from "../../../assets/bars.svg";
import xmarkIcon from "../../../assets/xmark.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoading } = usePreloader();
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Pequeno delay para garantir que o giro de entrada aconteça suavemente
      const timer = setTimeout(() => {
        setAnimationFinished(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <Link to="/" onClick={closeMenu}>
          <S.Logo src={logo} alt="The Dark West Logo" />
        </Link>
        <S.Nav isOpen={isMenuOpen}>
          <S.StyledNavLink
            to="/the-goal"
            onClick={closeMenu}
            $ready={!isLoading}
          >
            <span className="flip-container">
              <span className="front">THE GOAL</span>
              <span className="back">THE GOAL</span>
            </span>
          </S.StyledNavLink>

          <S.StyledNavLink
            to="/opportunities"
            onClick={closeMenu}
            $ready={!isLoading}
          >
            <span className="flip-container">
              <span className="front">OPPORTUNITIES</span>
              <span className="back">OPPORTUNITIES</span>
            </span>
          </S.StyledNavLink>

          <S.StyledNavLink
            to="/contact"
            onClick={closeMenu}
            $ready={!isLoading}
          >
            <span className="flip-container">
              <span className="front">CONTACT</span>
              <span className="back">CONTACT</span>
            </span>
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
