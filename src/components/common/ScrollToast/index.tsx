import {  AnimatePresence } from "framer-motion";
import * as S from "./styles";
import closeIcon from "../../../assets/xmark.svg";

interface ScrollToastProps {
  isVisible: boolean;
  onClose: () => void;
  onScroll: () => void;
  text: string;
}

const ScrollToast = ({
  isVisible,
  onClose,
  onScroll,
  text,
}: ScrollToastProps) => {
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique no 'X' acione a rolagem
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <S.ToastWrapper
          onClick={onScroll}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        >
          <span>{text}</span>
          <S.CloseButton onClick={handleCloseClick}>
            <img src={closeIcon} alt="Close" />
          </S.CloseButton>
        </S.ToastWrapper>
      )}
    </AnimatePresence>
  );
};

export default ScrollToast;
