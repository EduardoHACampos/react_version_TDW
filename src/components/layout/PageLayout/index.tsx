import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom"; // Importe o Outlet aqui!
import { usePreloader } from "../../../hooks/usePreloader";
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
    <S.MainContent bgImage={currentBg}>
      {/* O Outlet renderiza as páginas filhas (About, FAQ, etc) por dentro deste layout */}
      <Outlet />
    </S.MainContent>
  );
};

export default PageLayout;