import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import TheGoal from "../pages/TheGoal";
import Opportunities from "../pages/Opportunities";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import ComingSoon from "../pages/ComingSoon";
import About from "../pages/About"
import News from "../pages/News";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/the-goal" element={<TheGoal />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/news" element={<News />} />
        
        <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
