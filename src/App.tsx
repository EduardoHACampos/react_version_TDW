import { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";

// Context & Styles
import { PreloaderProvider, PreloadContext } from "./contexts/PreloadContext";
import * as S from "./App.styles";
import { GlobalResetStyle } from "./styles/GlobalReset";
import { GlobalStyle } from "./styles/GlobalStyle";

// Components
import Loader from "./components/common/Loader";
import ScrollToTop from "./components/common/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/Routes";

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
        {/* O AppRoutes vai chamar os Layouts corretos que já contêm o Header/Footer */}
        <AppRoutes /> 
      </S.AppWrapper>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <PreloaderProvider>
        <Router>
          <GlobalResetStyle />
          <GlobalStyle />
          <ScrollToTop />
          <AppContent />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            theme="dark"
          />
        </Router>
      </PreloaderProvider>
    </AuthProvider>
  );
};

export default App;