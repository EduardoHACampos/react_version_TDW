import { useContext } from "react";
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
import ScrollToTop from "./components/common/ScrollToTop";

const AppContent = () => {
  const { isLoading } = useContext(PreloadContext)!;

  return (
    <>
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>

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
        <ScrollToTop />
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
