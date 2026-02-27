import { useState } from "react";
import { Link } from "react-router-dom";
import { usePreloader } from "../../../hooks/usePreloader";
import * as S from "./styles";

import logo from "../../../assets/TheDarkWest_TextWithFlourish.png";
import barsIcon from "../../../assets/bars.svg";
import xmarkIcon from "../../../assets/xmark.svg";

import HeaderFlipItem from "./HeaderFlipItem";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoading } = usePreloader();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <Link to="/" onClick={closeMenu}>
          <S.Logo src={logo} alt="The Dark West Logo" />
        </Link>

        <S.Nav isOpen={isMenuOpen}>
          <HeaderFlipItem
            to="/the-goal"
            label="THE GOAL"
            ready={!isLoading}
            onClick={closeMenu}
            width="8.5ch"
            height="1.15em"
            padX="0.14em"
            canvasSize={23}
            canvasSpacing={0}
            canvasNudgeY="0px"
          />

          <HeaderFlipItem
            to="/opportunities"
            label="OPPORTUNITIES"
            ready={!isLoading}
            onClick={closeMenu}
            width="13.5ch"
            height="1.15em"
            padX="0.14em"
            canvasSize={23}
            canvasSpacing={0}
            canvasNudgeY="0px"
          />

          <HeaderFlipItem
            to="/contact"
            label="CONTACT"
            ready={!isLoading}
            onClick={closeMenu}
            width="8ch"
            height="1.15em"
            padX="0.14em"
            canvasSize={23}
            canvasSpacing={0}
            canvasNudgeY="0px"
          />
        </S.Nav>

        <S.MenuToggle onClick={toggleMenu} aria-label="Toggle menu">
          <img src={isMenuOpen ? xmarkIcon : barsIcon} alt="Menu Icon" />
        </S.MenuToggle>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};

export default Header;