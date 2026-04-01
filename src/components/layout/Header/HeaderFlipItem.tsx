import React from "react";
import RuneCanvas from "../../../components/common/RuneCanvas";
import * as S from "./styles";

type HeaderFlipItemProps = {
  to: string;
  label: string;
  ready?: boolean;
  onClick?: () => void;

  /** ajustes por item */
  width?: string;
  padX?: string;
  height?: string;
  canvasSize?: number;
  canvasSpacing?: number;
  canvasNudgeY?: string;
};

const HeaderFlipItem: React.FC<HeaderFlipItemProps> = ({
  to,
  label,
  ready,
  onClick,

  width = "fit-content",
  padX = "0.35em",      // ✅ era 0.14em (muito colado)
  height = "1.15em",
  canvasSize = 20,
  canvasSpacing = 0,
  canvasNudgeY = "0px",
}) => {
  return (
    <S.HeaderItem
      width={width}
      padX={padX}
      height={height}
      canvasNudgeY={canvasNudgeY}
    >
      <S.StyledNavLink to={to} onClick={onClick} $ready={ready}>
        <span className="flip-container">
          <span className="front">{label}</span>

          <span className="back" aria-hidden="true">
            <RuneCanvas
              text={label}
              size={canvasSize}
              spacing={canvasSpacing}
              color="currentColor"
            />
          </span>
        </span>
      </S.StyledNavLink>
    </S.HeaderItem>
  );
};

export default HeaderFlipItem;