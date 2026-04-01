import React, { useRef } from "react";
import * as S from "./styles";
import RuneCanvas, { RuneCanvasHandle } from "../RuneCanvas";

interface RuneActionProps {
  text: string;
  to?: string;
  onClick?: () => void;
  isExternal?: boolean;
  size?: number;
  className?: string;
}

const RuneAction: React.FC<RuneActionProps> = ({
  text,
  to,
  onClick,
  isExternal,
  size = 24,
  className,
}) => {
  const runeRef = useRef<RuneCanvasHandle>(null);

  const triggerKick = () => {
    runeRef.current?.kick(6);
  };

  const content = (
    <span
      className="flip-container"
      onMouseEnter={triggerKick}
      onFocus={triggerKick}
    >
      <span className="front">{text}</span>
      <span className="back" aria-hidden="true">
        <RuneCanvas
          ref={runeRef}
          text={text}
          size={size}
          color="currentColor"
        />
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