import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { usePreloader } from "../../../hooks/usePreloader";
import Header from "../Header"; // <-- Importar o Header
import Footer from "../Footer"; // <-- Importar o Footer
import * as S from "./styles";

// Assets
import homeBg from "../../../assets/KeyartTheDarkWestFinalFasepaintover.png";
import goalBg from "../../../assets/Group322.png";
import contactBg from "../../../assets/image491.png";

const backgroundMap: { [key: string]: string } = {
  "/": homeBg,
  "/the-goal": goalBg,
  "/contact": contactBg,
  "/opportunities": "",
};

const PageLayout = () => {
  const location = useLocation();
  const { startLoading } = usePreloader();

  const currentBg = backgroundMap[location.pathname] ?? homeBg;

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