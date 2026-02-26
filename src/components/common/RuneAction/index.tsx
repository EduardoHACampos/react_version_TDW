import React from "react";
import * as S from "./styles";
import RuneCanvas from "../RuneCanvas";

interface RuneActionProps {
  text: string;
  to?: string; // If provided, renders Link or <a>
  onClick?: () => void; // If provided, renders <button>
  isExternal?: boolean; // If true, uses <a> instead of Link
  size?: number; // Font size in pixels (runa size)
  className?: string; // Custom styles (ex: Background image)
}

/**
 * RuneAction
 * - Hover é um efeito transitório: começa em texto -> runa -> termina em texto.
 * - Sem state React controlando visibilidade.
 */
const RuneAction: React.FC<RuneActionProps> = ({
  text,
  to,
  onClick,
  isExternal,
  size = 24,
  className,
}) => {
  const content = (
    <span className="flip-container">
      <span className="front">{text}</span>
      <span className="back" aria-hidden="true">
        <RuneCanvas text={text} size={size} color="var(--color-hover-purple)" />
      </span>
    </span>
  );

  if (to) {
    if (isExternal) {
      return (
        <S.AnchorElement
          href={to}
          target="_blank"
          rel="noreferrer"
          className={className}
          onClick={onClick}
        >
          {content}
        </S.AnchorElement>
      );
    }

    return (
      <S.LinkElement to={to} className={className} onClick={onClick}>
        {content}
      </S.LinkElement>
    );
  }

  return (
    <S.ButtonElement type="button" className={className} onClick={onClick}>
      {content}
    </S.ButtonElement>
  );
};

export default RuneAction;