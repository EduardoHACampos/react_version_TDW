import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { canManageJobs, canManageUsers } from "../../../utils/roles";
import * as S from "./styles";

const DashboardLayout: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/internal/access", { replace: true });
  };

  return (
    <S.LayoutContainer>
      <S.SidebarRail>
        <S.Sidebar>
          <S.SidebarHeader>
            <S.Title>Studio Panel</S.Title>
            <S.Subtitle>Welcome, {user?.name}</S.Subtitle>
          </S.SidebarHeader>

          <S.NavList>
            <S.NavItem to="/internal/dashboard">Overview</S.NavItem>
            <S.NavItem to="/internal/news">Publications</S.NavItem>

            {canManageJobs(user?.role) && (
              <S.NavItem to="/internal/jobs">Job Board</S.NavItem>
            )}

            {canManageUsers(user?.role) && (
              <S.NavItem to="/internal/team">Team Management</S.NavItem>
            )}
          </S.NavList>

          <S.LogoutButton onClick={handleLogout}>Logout</S.LogoutButton>
        </S.Sidebar>
      </S.SidebarRail>

      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.LayoutContainer>
  );
};

export default DashboardLayout;
