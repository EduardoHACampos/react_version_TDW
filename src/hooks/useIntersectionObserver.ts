import { useState, useEffect, RefObject } from "react";

/**
 * Um hook customizado que detecta se um elemento está visível na tela.
 * @param elementRef A referência (ref) para o elemento a ser observado.
 * @param options Opções para o IntersectionObserver (ex: threshold).
 * @returns 'true' se o elemento estiver visível, 'false' caso contrário.
 */
function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: IntersectionObserverInit = { threshold: 0.1 } // Considera visível se 10% do elemento aparecer
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, options]);

  return isIntersecting;
}

export default useIntersectionObserver;
