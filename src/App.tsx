import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import * as S from "./App.styles";

import { GlobalResetStyle } from "./styles/GlobalReset";
import { GlobalStyle } from "./styles/GlobalStyle";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import TheGoal from "./pages/TheGoal";
import Opportunities from "./pages/Opportunities";
import Contact from "./pages/Contact";
import Loader from "./components/common/Loader";

import homeBg from "./assets/KeyartTheDarkWestFinalFasepaintover.png";
import goalBg from "./assets/Group322.png";
import opportunitiesBg from "./assets/image485.png";
import contactBg from "./assets/image491.png";

const PageLayout = () => {
  const location = useLocation();
  const [backgroundImage, setBackgroundImage] = useState(homeBg);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setBackgroundImage(homeBg);
        break;
      case "/the-goal":
        setBackgroundImage(goalBg);
        break;
      case "/opportunities":
        setBackgroundImage(opportunitiesBg);
        break;
      case "/contact":
        setBackgroundImage(contactBg);
        break;
      default:
        setBackgroundImage(homeBg);
    }
  }, [location.pathname]);

  return (
    <S.MainContent bgImage={backgroundImage}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/the-goal" element={<TheGoal />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </S.MainContent>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <GlobalResetStyle />
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <S.AppWrapper>
        <Header />
        <PageLayout />
        <Footer />
      </S.AppWrapper>
    </Router>
  );
}

export default App;
