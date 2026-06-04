import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { usePreloader } from "../../../hooks/usePreloader";
import Header from "../Header"; // <-- Importar o Header
import Footer from "../Footer"; // <-- Importar o Footer
import * as S from "./styles";

import goalBg from "../../../assets/Group322-bg.webp";
import contactBg from "../../../assets/image491-bg.webp";

const backgroundMap: { [key: string]: string } = {
  "/the-goal": goalBg,
  "/contact": contactBg,
  "/opportunities": "",
};

const PageLayout = () => {
  const location = useLocation();
  const { startLoading } = usePreloader();

  const currentBg = backgroundMap[location.pathname] ?? "";

  useEffect(() => {
    const assetsForCurrentPage = currentBg ? [currentBg] : [];
    startLoading(location.pathname, assetsForCurrentPage);
  }, [location.pathname, startLoading]);

  return (
    <>
      <Header /> {/* <-- Adicionar aqui */}
      <S.MainContent bgImage={currentBg}>
        <Outlet />
      </S.MainContent>
      <Footer /> {/* <-- Adicionar aqui */}
    </>
  );
};

export default PageLayout;
