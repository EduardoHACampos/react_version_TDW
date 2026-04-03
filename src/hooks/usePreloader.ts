import { useContext } from "react";
import { PreloadContext } from "../contexts/PreloadContext";

export const usePreloader = () => {
  const context = useContext(PreloadContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context; // Retorna o contexto completo
};
