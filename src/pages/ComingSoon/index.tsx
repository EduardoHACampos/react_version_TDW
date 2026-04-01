import React, { useEffect, useState } from "react";
import * as S from "./styles";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader"; 
import { useNavigate, useLocation } from "react-router-dom";

interface ComingSoonProps {
  moduleName?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ moduleName = "This section" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    
    setIsLoading(true);
    
  
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.key]);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <S.PageContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <S.ContentFadeIn>
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
        </S.ContentFadeIn>
      )}
    </S.PageContainer>
  );
};

export default ComingSoon;