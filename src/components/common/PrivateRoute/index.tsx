/*
 Route guardian. Redirects unauthenticated users back to the internal login page.
 
 Guardião de rotas. Redireciona usuários não autenticados de volta para a página de login interno.
*/

import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="/studio/access" replace />;
};

export default PrivateRoute;