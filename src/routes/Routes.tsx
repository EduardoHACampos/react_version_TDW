/*
 Adds the protected routing group for the studio dashboard.

 Adiciona o grupo de rotas protegidas para o dashboard do estúdio.
*/

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../components/layout/MainLayout";
import PageLayout from "../components/layout/PageLayout";
import DashboardLayout from "../components/layout/Footer";

// Components
import PrivateRoute from "../components/common/PrivateRoute";

// Pages
import Home from "../pages/Home";
import News from "../pages/News";
import ComingSoon from "../pages/ComingSoon";
import About from "../pages/About";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";
import Opportunities from "../pages/Opportunities";
import InternalLogin from "../pages/InternalLogin";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
      </Route>

      <Route element={<PageLayout />}>
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/media" element={<ComingSoon />} />
        
        <Route path="/ladder" element={<ComingSoon />} />
        <Route path="/wiki" element={<ComingSoon />} />
        <Route path="/community" element={<ComingSoon />} />
      </Route>

      <Route path="/internal/access" element={<InternalLogin />} />

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/internal/dashboard" element={<h1>Overview (WiP)</h1>} />
          <Route path="/internal/news" element={<h1>Patch Notes (WiP)</h1>} />
          <Route path="/internal/jobs" element={<h1>Job Board (WiP)</h1>} />
          <Route path="/internal/team" element={<h1>Team Management (WiP)</h1>} />
        </Route>
      </Route>

      {/* ROTA CURINGA: Se o usuário digitar um link que não existe, joga pra Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;