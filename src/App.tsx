import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import { useContext } from "react";

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

const AppContent = () => {
  const { isLoading } = useContext(PreloadContext)!;

  return (
    <>
      {/* O Loader é renderizado como uma sobreposição */}
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>

      {/* O conteúdo principal fica invisível e com opacidade 0 durante o loading */}
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

function App() {
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
      <PreloaderProvider>
        <AppContent />
      </PreloaderProvider>
    </Router>
  );
}

export default App;
