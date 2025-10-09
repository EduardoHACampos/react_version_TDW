import * as S from "./styles";
import discordIcon from "../../../assets/Discord.png";
import instagramIcon from "../../../assets/Instagram.svg";
import twitchIcon from "../../../assets/Twitch.svg";
import twitterIcon from "../../../assets/Twitter.svg";

const Footer = () => {
  return (
    <S.FooterContainer>
      <S.FooterContent>
        <S.Section>
          <h2>OUR CHANNELS</h2>
          <S.SocialIcons>
            <a
              href="https://discord.gg/invite/thedarkwest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={discordIcon} alt="Discord" />
            </a>
            <a
              href="https://www.instagram.com/thedarkwest/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a
              href="https://www.twitch.tv/thedarkwest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitchIcon} alt="Twitch" />
            </a>
            <a
              href="https://twitter.com/thedarkwestgame"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitterIcon} alt="Twitter" />
            </a>
          </S.SocialIcons>
        </S.Section>

      </S.FooterContent>
      <S.Copyright>
        <p>© 2023 The Dark West. All rights reserved.</p>
      </S.Copyright>
    </S.FooterContainer>
  );
};

export default Footer;
