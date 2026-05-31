import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import PageLayout from "../components/layout/PageLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import PrivateRoute from "../components/common/PrivateRoute";
import RoleRoute from "../components/common/RoleRoute";

import Home from "../pages/Home";
import News from "../pages/News";
import PublicationDetail from "../pages/PublicationDetail";
import TheGoal from "../pages/TheGoal";
import ComingSoon from "../pages/ComingSoon";
import About from "../pages/About";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";
import Opportunities from "../pages/Opportunities";
import InternalDashboard from "../pages/InternalDashboard";
import InternalLogin from "../pages/InternalLogin";
import InternalNews from "../pages/InternalNews";
import InternalJobs from "../pages/InternalJobs";
import InternalTeam from "../pages/InternalTeam";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<PublicationDetail />} />
      </Route>

      <Route element={<PageLayout />}>
        <Route path="/about" element={<About />} />
        <Route path="/the-goal" element={<TheGoal />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/media" element={<ComingSoon />} />
        <Route path="/game/ladders" element={<ComingSoon />} />
        <Route path="/game/download" element={<ComingSoon />} />
        <Route path="/ladder" element={<ComingSoon />} />
        <Route path="/wiki" element={<ComingSoon />} />
        <Route path="/community" element={<ComingSoon />} />
      </Route>

      <Route path="/internal/access" element={<InternalLogin />} />

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/internal/dashboard" element={<InternalDashboard />} />
          <Route path="/internal/news" element={<InternalNews />} />

          <Route element={<RoleRoute allowedRoles={["ADMIN", "LEADER"]} />}>
            <Route path="/internal/jobs" element={<InternalJobs />} />
            <Route path="/internal/team" element={<InternalTeam />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
