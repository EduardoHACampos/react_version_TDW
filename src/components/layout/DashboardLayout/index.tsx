/*
 Base layout for the internal administrative panel.
 Provides the sidebar and renders protected routes via Outlet.

 Layout base para o painel administrativo interno.
 Fornece a barra lateral e renderiza as rotas protegidas via Outlet.
*/

import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import * as S from "./styles";

const DashboardLayout: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/studio/access");
  };

  return (
    <S.LayoutContainer>
      <S.Sidebar>
        <S.SidebarHeader>
          <S.Title>Studio Panel</S.Title>
          <S.Subtitle>Welcome, {user?.name}</S.Subtitle>
        </S.SidebarHeader>

        <S.NavList>
          <S.NavItem to="/studio/dashboard">Overview</S.NavItem>
          <S.NavItem to="/studio/news">Patch Notes</S.NavItem>
          <S.NavItem to="/studio/jobs">Job Board</S.NavItem>
          
          {(user?.role === "ADMIN" || user?.role === "LEADER") && (
            <S.NavItem to="/studio/team">Team Management</S.NavItem>
          )}
        </S.NavList>

        <S.LogoutButton onClick={handleLogout}>
          Logout
        </S.LogoutButton>
      </S.Sidebar>

      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.LayoutContainer>
  );
};

export default DashboardLayout;