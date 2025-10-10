import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

// Função auxiliar para pré-carregar uma imagem (sem alterações)
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => {
      console.warn(`Failed to load image, but continuing: ${src}`);
      resolve(); // Resolve em caso de erro para não travar o app
    };
    img.src = src;
  });
};

interface PreloadContextType {
  isLoading: boolean;
  startLoading: (routePath: string, assetsToLoad: string[]) => void;
}

export const PreloadContext = createContext<PreloadContextType | undefined>(
  undefined
);

interface PreloaderProviderProps {
  children: ReactNode;
}

export const PreloaderProvider = ({ children }: PreloaderProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedRoutes, setLoadedRoutes] = useState(new Set<string>());

  const startLoading = useCallback(
    async (routePath: string, assetsToLoad: string[]) => {
      // Se a rota já foi carregada, não mostra o loader.
      if (loadedRoutes.has(routePath)) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        // Promessa para os recursos (fontes e imagens)
        const assetPromise = Promise.all([
          document.fonts.ready,
          ...assetsToLoad.map(preloadImage),
        ]);

        // Promessa para o tempo mínimo de 1 segundo (1000ms)
        const timerPromise = new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );

        // Aguarda AMBAS as promessas serem concluídas
        await Promise.all([assetPromise, timerPromise]);

        // Adiciona a rota ao set de rotas carregadas
        setLoadedRoutes((prev) => new Set(prev).add(routePath));
      } catch (error) {
        console.error("Failed to preload assets:", error);
      } finally {
        // Garante que o estado de loading seja atualizado ao final
        setIsLoading(false);
      }
    },
    [loadedRoutes]
  );

  // Efeito para o carregamento inicial da aplicação
  useEffect(() => {
    // Usamos um caminho genérico como "/" para o primeiro load
    startLoading("/", []);
  }, []);

  return (
    <PreloadContext.Provider value={{ isLoading, startLoading }}>
      {children}
    </PreloadContext.Provider>
  );
};
