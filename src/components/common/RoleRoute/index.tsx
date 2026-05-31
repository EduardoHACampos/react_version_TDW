import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type { UserRole } from "../../../interface";
import { hasAllowedRole } from "../../../utils/roles";

interface RoleRouteProps {
  allowedRoles: UserRole[];
}

const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated, isLoadingSession } = useContext(AuthContext);

  if (isLoadingSession) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/internal/access" replace />;
  }

  if (!hasAllowedRole(user?.role, allowedRoles)) {
    return <Navigate to="/internal/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
