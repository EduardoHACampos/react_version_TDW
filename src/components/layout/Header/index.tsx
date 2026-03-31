/*
 English: 
 Header component updated to implement the vector icon pointing down with proper spacing.
 Width constraint "5ch" was changed to "fit-content" to stop the text from compressing and overlapping the icon.
 
 Explicação em português aqui: 
 Componente Header atualizado para implementar o ícone vetorial apontando para baixo com o espaçamento adequado.
 A restrição de largura "5ch" foi alterada para "fit-content" para evitar que o texto seja comprimido e sobreponha o ícone.
 
 Caminho / Path: src/components/layout/Header/index.tsx
*/

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
                /* English: fit-content prevents squishing / Explicação em português aqui: fit-content previne o esmagamento */
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
                /* English: fit-content prevents squishing / Explicação em português aqui: fit-content previne o esmagamento */
                width="fit-content"
                canvasSize={23}
              />
              <S.DropdownArrow
                $iconSrc={arrowIcon}
                className="dropdown-arrow"
              />
            </S.DropdownTrigger>
            <S.DropdownContent className="dropdown-content">
              <S.DropdownItem to="/shop/purchase" onClick={closeMenu}>
                Purchase Game
              </S.DropdownItem>
              <S.DropdownItem to="/shop/founder-packs" onClick={closeMenu}>
                Founder / Support Pack
              </S.DropdownItem>
              <S.DropdownItem to="/shop/mtx" onClick={closeMenu}>
                MTX
              </S.DropdownItem>
              <S.DropdownItem to="/shop/expansions" onClick={closeMenu}>
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
