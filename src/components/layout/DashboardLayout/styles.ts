/*
 Styling for the Dashboard Layout structure and Sidebar navigation.

 Estilização para a estrutura do Layout do Dashboard e navegação da Barra Lateral.
*/

import styled from "styled-components";
import { Link } from "react-router-dom";

export const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-background-dark);
`;

export const SidebarRail = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 250px;
  height: 100vh;
  height: 100dvh;
  overflow-y: auto;

  @media (max-width: 760px) {
    position: static;
    width: 100%;
    height: auto;
    overflow: visible;
  }
`;

export const Sidebar = styled.aside`
  min-height: 100%;
  background-color: var(--color-background-card);
  border-right: 1px solid var(--color-border);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 760px) {
    min-height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--color-border);
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h2`
  color: var(--color-primary-text);
  font-family: var(--font-heading);
  margin: 0;
  font-size: 1.5rem;
`;

export const Subtitle = styled.small`
  color: var(--color-text-light);
  font-family: var(--font-primary);
  font-size: 0.9rem;
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavItem = styled(Link)`
  color: var(--color-text-light);
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 4px;
  font-family: var(--font-primary);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(167, 150, 255, 0.1);
    color: var(--color-hover-purple);
  }
`;

export const LogoutButton = styled.button`
  margin-top: auto;
  padding: 12px;
  background: transparent;
  border: 1px solid #ff4d4d;
  color: #ff4d4d;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 77, 77, 0.1);
  }
`;

export const MainContent = styled.main`
  min-height: 100vh;
  margin-left: 250px;
  padding: 2rem;
  color: var(--color-text-light);

  @media (max-width: 760px) {
    margin-left: 0;
  }
`;
