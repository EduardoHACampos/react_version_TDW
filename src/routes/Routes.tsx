import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import TheGoal from "../pages/TheGoal";
import Opportunities from "../pages/Opportunities";
import Contact from "../pages/Contact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/the-goal" element={<TheGoal />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
