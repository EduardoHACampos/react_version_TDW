import * as S from "./styles";
import Button from "../../components/common/Button";
import SectionTextBlock from "../../components/common/SectionTextBlock";

const TheGoal = () => {
  const discordInviteLink = "https://discord.com/invite/8EuWZjDE2t";

  const handleRedirect = () => {
    window.open(discordInviteLink, "_blank", "noopener,noreferrer");
  };

  return (
    <S.PageContainer>
      <S.ContentWrapper>
        <SectionTextBlock
          title="THE RECKONING – WHAT WAS STOLEN, RESTORED"
          mobileWidth="320px"
          desktopWidth="550px"
          p1="The Dark West isn’t just about killing and looting. It’s a world distinct, alive, and purposefully crafted."
          p2="Every battle, every moment of exploration, and every step forward is shaped by a world that is seamless, inviting, yet deeply compelling."
        />

        <S.ButtonContainer>
          <Button text="Support Us" onClick={handleRedirect} />
          <Button text="Help Us Grow" onClick={handleRedirect} />
        </S.ButtonContainer>
      </S.ContentWrapper>
    </S.PageContainer>
  );
};

export default TheGoal;
