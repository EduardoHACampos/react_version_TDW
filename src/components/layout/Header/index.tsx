import { useState } from "react";
import { Link } from "react-router-dom";
import { usePreloader } from "../../../hooks/usePreloader";
import * as S from "./styles";

import logo from "../../../assets/TheDarkWest_Logo.png";
import barsIcon from "../../../assets/bars.svg";
import xmarkIcon from "../../../assets/xmark.svg";
import arrowIcon from "../../../assets/Vector2.svg";

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
            to="/faq"
            label="FAQ"
            ready={!isLoading}
            onClick={closeMenu}
            width="4ch"
            canvasSize={23}
          />
          <S.DropdownContainer>
            <S.DropdownTrigger>
              <HeaderFlipItem
                to="#"
                label="GAME"
                ready={!isLoading}
                width="fit-content"
                canvasSize={23}
              />
              <S.DropdownArrow
                $iconSrc={arrowIcon}
                className="dropdown-arrow"
              />
            </S.DropdownTrigger>
            <S.DropdownContent className="dropdown-content">
              <S.DropdownItem to="/about" onClick={closeMenu}>
                About
              </S.DropdownItem>
              <S.DropdownItem to="/news" onClick={closeMenu}>
                News
              </S.DropdownItem>
              <S.DropdownItem to="/game/ladders" onClick={closeMenu}>
                Ladders
              </S.DropdownItem>
              <S.DropdownItemExternal
                href="https://wiki.playdarkwest.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Community Wiki <span className="icon">↗</span>
              </S.DropdownItemExternal>
              <S.DropdownItem to="/game/download" onClick={closeMenu}>
                Download
              </S.DropdownItem>
            </S.DropdownContent>
          </S.DropdownContainer>

          <S.DropdownContainer>
            <S.DropdownTrigger>
              <HeaderFlipItem
                to="#"
                label="SHOP"
                ready={!isLoading}
                width="fit-content"
                canvasSize={23}
              />
              <S.DropdownArrow
                $iconSrc={arrowIcon}
                className="dropdown-arrow"
              />
            </S.DropdownTrigger>
            <S.DropdownContent className="dropdown-content">
              <S.DropdownItem to="/coming-soon" onClick={closeMenu}>
                Purchase Game
              </S.DropdownItem>
              <S.DropdownItem to="/coming-soon" onClick={closeMenu}>
                Founder / Support Pack
              </S.DropdownItem>
              <S.DropdownItem to="/coming-soon" onClick={closeMenu}>
                MTX
              </S.DropdownItem>
              <S.DropdownItem to="/coming-soon" onClick={closeMenu}>
                Expansions
              </S.DropdownItem>
            </S.DropdownContent>
          </S.DropdownContainer>

          <HeaderFlipItem
            to="/the-goal"
            label="THE GOAL"
            ready={!isLoading}
            onClick={closeMenu}
            width="8.5ch"
            canvasSize={23}
          />

          <HeaderFlipItem
            to="/opportunities"
            label="OPPORTUNITIES"
            ready={!isLoading}
            onClick={closeMenu}
            width="13.5ch"
            canvasSize={23}
          />

          <HeaderFlipItem
            to="/contact"
            label="CONTACT"
            ready={!isLoading}
            onClick={closeMenu}
            width="8ch"
            canvasSize={23}
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
