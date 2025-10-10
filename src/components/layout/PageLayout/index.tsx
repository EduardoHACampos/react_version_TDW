import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePreloader } from "../../../hooks/usePreloader";
import AppRoutes from "../../../routes/Routes"; // Mantive o nome do arquivo que você está usando
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
    // Passa o caminho da rota atual para a função de carregamento
    startLoading(location.pathname, assetsForCurrentPage);
  }, [location.pathname, startLoading]);

  return (
    <S.MainContent bgImage={currentBg}>
      <AppRoutes />
    </S.MainContent>
  );
};

export default PageLayout;
