import * as S from "./styles";
import discordIcon from "../../../assets/Discord.png";
import instagramIcon from "../../../assets/Instagram.svg";
import twitchIcon from "../../../assets/Twitch.svg";
import twitterIcon from "../../../assets/Twitter.svg";
import DownloadButton from "../../common/DownloadButton";
import * as SD from "../../common/DownloadButton/styles"; // Importe o novo styles.ts que você criou
const Footer = () => {
  return (
    <S.FooterContainer>
      <S.FooterContent>
        <S.Section>
          <h2>OUR CHANNELS</h2>
          <S.SocialIcons>
            <a
              href="https://discord.com/invite/47YskyYJcy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={discordIcon} alt="Discord" />
            </a>
            <a
              href="https://www.instagram.com/playdarkwest/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a
              href="https://www.twitch.tv/playdarkwest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitchIcon} alt="Twitch" />
            </a>
            <a
              href="https://x.com/PlayDarkWest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitterIcon} alt="Twitter" />
            </a>
          </S.SocialIcons>
          <DownloadButton 
            as={SD.DownloadLink} 
            fileName="TheDarkWest-PressKit.zip" 
            label="Press Kit" 
          />
        </S.Section>
      </S.FooterContent>
      <S.Copyright>
        <p>© 2026 The Dark West. All rights reserved.</p>
      </S.Copyright>
    </S.FooterContainer>
  );
};

export default Footer;
