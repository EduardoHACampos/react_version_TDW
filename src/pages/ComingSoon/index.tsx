import React from "react";
import * as S from "./styles";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

interface ComingSoonProps {
  moduleName?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ moduleName = "This section" }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <S.PageContainer>
      <S.IconWrapper>
        {/* Simple text icon placeholder. Can be replaced with SVG/Image later */}
        {/* Placeholder simples de ícone em texto. Pode ser substituído por SVG/Imagem depois */}
        ⚒️
      </S.IconWrapper>
      
      <S.Title>Work in Progress</S.Title>
      
      <S.Subtitle>
        {moduleName} is currently under construction. 
        Our scribes and blacksmiths are working hard to bring this to you soon.
      </S.Subtitle>

      <Button text="Return to Home" onClick={handleGoBack} />
    </S.PageContainer>
  );
};

export default ComingSoon;