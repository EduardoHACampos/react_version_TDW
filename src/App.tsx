/* src/App.tsx */
import { useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";

// Context & Styles
import { PreloaderProvider, PreloadContext } from "./context/PreloadContext";
import * as S from "./App.styles";
import { GlobalResetStyle } from "./styles/GlobalReset";
import { GlobalStyle } from "./styles/GlobalStyle";

// Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Loader from "./components/common/Loader";
import PageLayout from "./components/layout/PageLayout";

// Proteção de Fontes
import { decryptFontData } from "./utils/fontProtector";
import { PROTECTED_FONT_CHUNKS } from "./constants/fontChunks"; // Importa o array que você gerou

const AppContent = () => {
  const { isLoading } = useContext(PreloadContext)!;

  useEffect(() => {
    const loadSecureFont = async () => {
      try {
        // 1. Reconstrói a string a partir dos pedaços para evitar erros de strings muito longas
        const fullProtectedData = PROTECTED_FONT_CHUNKS.join("");

        // 2. Descriptografa os dados usando a sua chave XOR
        const decryptedBase64 = decryptFontData(fullProtectedData);

        // 3. Cria a interface FontFace dinamicamente
        const fontFace = new FontFace(
          "Witchcraft",
          `url(data:font/opentype;base64,${decryptedBase64})`
        );

        // 4. Carrega e injeta no documento
        const loadedFont = await fontFace.load();
        document.fonts.add(loadedFont);

        console.log("Sistema de proteção: Fonte 'Witchcraft' carregada.");
      } catch (error) {
        console.error("Erro ao carregar asset protegido:", error);
      }
    };

    loadSecureFont();
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader />}
      </AnimatePresence>
      
      <S.AppWrapper
        style={{ visibility: isLoading ? "hidden" : "visible" }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Header />
        <PageLayout />
        <Footer />
      </S.AppWrapper>
    </>
  );
};

const App = () => {
  return (
    <PreloaderProvider>
      <Router>
        <GlobalResetStyle />
        <GlobalStyle />
        <AppContent />
        <ToastContainer
          position="bottom-right"
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
      </Router>
    </PreloaderProvider>
  );
};

export default App;