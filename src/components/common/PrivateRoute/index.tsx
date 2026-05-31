import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isLoadingSession } = useContext(AuthContext);

  if (isLoadingSession) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/internal/access" replace />;
};

export default PrivateRoute;
