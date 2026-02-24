import * as S from "./styles";
import discordIcon from "../../../assets/Discord.png";
import instagramIcon from "../../../assets/Instagram.svg";
import twitchIcon from "../../../assets/Twitch.svg";
import twitterIcon from "../../../assets/Twitter.svg";
import redditIcon from "../../../assets/Reddit.svg";
import youtubeIcon from "../../../assets/YouTube.svg";
import tiktokIcon from "../../../assets/TikTok.svg";
import { PressKitLink } from "./styles";

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
            <a
              href="https://www.tiktok.com/@thedarkwest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tiktokIcon} alt="Tiktok" />
            </a>
            <a
              href="https://www.youtube.com/@PlayTheDarkWest "
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={youtubeIcon} alt="Youtube" />
            </a>
            <a
              href="https://www.reddit.com/r/TheDarkWest/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={redditIcon} alt="Reddit" />
            </a>
          </S.SocialIcons>

          <PressKitLink
            href="https://drive.google.com/drive/folders/1ZRpxJv9hIdQCQbjJ9i-3P8SYo7VLajOu"
            target="_blank"
            rel="noopener noreferrer"
            title="Download Press Kit (Zip)"
          >
            Press Kit
          </PressKitLink>
        </S.Section>
      </S.FooterContent>
      <S.Copyright>
        <p>© 2026 The Dark West. All rights reserved.</p>
      </S.Copyright>
    </S.FooterContainer>
  );
};

export default Footer;
