import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import PageLayout from "../components/layout/PageLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import PrivateRoute from "../components/common/PrivateRoute";
import RoleRoute from "../components/common/RoleRoute";

const Home = lazy(() => import("../pages/Home"));
const News = lazy(() => import("../pages/News"));
const PublicationDetail = lazy(() => import("../pages/PublicationDetail"));
const TheGoal = lazy(() => import("../pages/TheGoal"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));
const About = lazy(() => import("../pages/About"));
const FAQ = lazy(() => import("../pages/FAQ"));
const Contact = lazy(() => import("../pages/Contact"));
const Opportunities = lazy(() => import("../pages/Opportunities"));
const InternalDashboard = lazy(() => import("../pages/InternalDashboard"));
const InternalLogin = lazy(() => import("../pages/InternalLogin"));
const InternalNews = lazy(() => import("../pages/InternalNews"));
const InternalJobs = lazy(() => import("../pages/InternalJobs"));
const InternalTeam = lazy(() => import("../pages/InternalTeam"));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
};

export default AppRoutes;
