import * as S from "./styles";
import skullCow from "../../../assets/lines_POE_COW.png";
import React from "react";

// Interface para definir as props do componente
interface SectionTextBlockProps {
  title: string;
  children?: React.ReactNode;
  desktopWidth?: string; // Prop para largura em desktop
  mobileWidth?: string; // Prop para largura em mobile
  [key: string]: any;
}

const SectionTextBlock = (props: SectionTextBlockProps) => {
  const { title, children, desktopWidth, mobileWidth } = props;

  const paragraphKeys = Object.keys(props)
    .filter((key) => /^p\d+$/.test(key))
    .sort();

  return (
    // Passa as props de largura para o componente estilizado
    <S.Wrapper desktopWidth={desktopWidth} mobileWidth={mobileWidth}>
      <S.DividerImage src={skullCow} alt="Decorative Divider" />
      <S.Title>{title}</S.Title>
      <S.DividerImage src={skullCow} alt="Decorative Divider" rotated />

      {paragraphKeys.map((key) => (
        <S.Text key={key}>{props[key]}</S.Text>
      ))}

      {children}
    </S.Wrapper>
  );
};

export default SectionTextBlock;
