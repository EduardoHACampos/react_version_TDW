import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import Button from "../../components/common/Button";
import SectionTextBlock from "../../components/common/SectionTextBlock";

const TheGoal = () => {

  return (
    <S.PageContainer>
      <S.ContentWrapper>
        {/* 1. O SectionTextBlock é usado apenas para o conteúdo de texto */}
        <SectionTextBlock
          title="THE RECKONING – WHAT WAS STOLEN, RESTORED"
          mobileWidth="320px"
          desktopWidth="550px"
          p1="The Dark West isn’t just about killing and looting. It’s a world distinct, alive, and purposefully crafted."
          p2="Every battle, every moment of exploration, and every step forward is shaped by a world that is seamless, inviting, yet deeply compelling."
        />

        {/* 2. O ButtonContainer é um elemento separado, irmão do SectionTextBlock */}
        <S.ButtonContainer>
          <Button
            text="Support Us"
            onClick={() => alert("Support Us clicked!")}
          />
          <Button
            text="Help Us Grow"
            onClick={() => alert("Help Us Grow clicked!")}
          />
        </S.ButtonContainer>
      </S.ContentWrapper>
    </S.PageContainer>
  );
};

export default TheGoal;
