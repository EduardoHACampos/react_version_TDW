import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePreloader } from "../../../hooks/usePreloader";
import * as S from "./styles";

import logo from "../../../assets/TheDarkWest_TextWithFlourish.png";
import barsIcon from "../../../assets/bars.svg";
import xmarkIcon from "../../../assets/xmark.svg";
import RuneCanvas from "../../../components/common/RuneCanvas";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoading } = usePreloader();

  useEffect(() => {
    // mantém seu comportamento original de “ready”
  }, [isLoading]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const NAV_SIZE = 22; // ~1.1em
  const NAV_SPACING = 4; // mais compacto no header

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <Link to="/" onClick={closeMenu}>
          <S.Logo src={logo} alt="The Dark West Logo" />
        </Link>

        <S.Nav isOpen={isMenuOpen}>
          <S.StyledNavLink to="/the-goal" onClick={closeMenu} $ready={!isLoading}>
            <span className="flip-container">
              <span className="front">THE GOAL</span>
              <span className="back" aria-hidden="true">
                <RuneCanvas
                  text="THE GOAL"
                  size={NAV_SIZE}
                  spacing={NAV_SPACING}
                  color="var(--color-hover-purple)"
                />
              </span>
            </span>
          </S.StyledNavLink>

          <S.StyledNavLink
            to="/opportunities"
            onClick={closeMenu}
            $ready={!isLoading}
          >
            <span className="flip-container">
              <span className="front">OPPORTUNITIES</span>
              <span className="back" aria-hidden="true">
                <RuneCanvas
                  text="OPPORTUNITIES"
                  size={NAV_SIZE}
                  spacing={NAV_SPACING}
                  color="var(--color-hover-purple)"
                />
              </span>
            </span>
          </S.StyledNavLink>

          <S.StyledNavLink to="/contact" onClick={closeMenu} $ready={!isLoading}>
            <span className="flip-container">
              <span className="front">CONTACT</span>
              <span className="back" aria-hidden="true">
                <RuneCanvas text="CONTACT" size={NAV_SIZE} spacing={NAV_SPACING} color="currentColor" />
              </span>
            </span>
          </S.StyledNavLink>
        </S.Nav>

        <S.MenuToggle onClick={toggleMenu} aria-label="Toggle menu">
          <img src={isMenuOpen ? xmarkIcon : barsIcon} alt="Menu Icon" />
        </S.MenuToggle>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};

export default Header;