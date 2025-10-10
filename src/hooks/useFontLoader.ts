import { useEffect } from "react";

/**
 * Hook customizado que detecta quando as fontes da página terminaram de carregar
 * e aplica uma classe ao body para tornar o conteúdo visível.
 */
export const useFontLoader = () => {
  useEffect(() => {
    // A propriedade 'ready' retorna uma Promise que é resolvida
    // quando o carregamento e layout da fonte são concluídos.
    document.fonts.ready.then(() => {
      document.body.classList.add("fonts-ready");
    });
  }, []); // O array vazio garante que isso rode apenas uma vez
};
