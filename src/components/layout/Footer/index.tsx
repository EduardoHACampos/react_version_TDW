/*
 English: 
 Main Footer component updated based on the visual guide.
 - Unfinished pages (marked with Red X) are now redirected to "/coming-soon".
 - Functional pages (marked with Green Arrow) route to their respective pages or external URLs.
 - Contact Support links directly to the "/contact" route.
 
 Explicação em português aqui: 
 Componente principal do rodapé atualizado com base no guia visual.
 - Páginas inacabadas (marcadas com X Vermelho) estão agora redirecionadas para "/coming-soon".
 - Páginas funcionais (marcadas com Seta Verde) encaminham para as suas respetivas páginas ou URLs externos.
 - Contact Support aponta diretamente para a rota "/contact".
*/

import * as S from "./styles";
import FooterColumn from "./FooterColumn";

/* Assets */
import logo from "../../../assets/TheDarkWest_TextWithFlourish.png";
import discordIcon from "../../../assets/Discord.png";
import instagramIcon from "../../../assets/Instagram.svg";
import twitchIcon from "../../../assets/Twitch.svg";
import twitterIcon from "../../../assets/Twitter.svg";
import redditIcon from "../../../assets/Reddit.svg";
import youtubeIcon from "../../../assets/youtube-icon.svg";

const Footer = () => {
  const playLinks = [
    { label: "Download", to: "/coming-soon" },
    { label: "Patch Notes", to: "/news" },
    { label: "Supporter Packs", to: "/coming-soon" },
    { label: "Steam Store", href: "https://store.steampowered.com/app/3574750/The_Dark_West/" },
    { label: "Twitch Drops", to: "/coming-soon" },
  ];

  const learnLinks = [
    { label: "Skill System", to: "/coming-soon" },
    { label: "Items & Crafting", to: "/coming-soon" },
    { label: "End Game", to: "/coming-soon" },
    { label: "Classes", to: "/coming-soon" },
    { label: "World & Story", to: "/coming-soon" },
  ];

  const visualLinks = [
    { label: "Wallpapers", to: "/coming-soon" },
    { label: "PNG's", to: "/coming-soon" },
    { label: "Mobile / Desktop", to: "/coming-soon" },
  ];

  const hangOutLinks = [
    { label: "Forum", to: "/coming-soon" },
    { label: "Discord", href: "https://discord.gg/47YskyYJcy" },
    { label: "r/TheDarkWest", href: "https://www.reddit.com/r/TheDarkWest/" },
  ];

  const otherLinks = [
    { label: "Careers", to: "/opportunities" },
    { label: "Contact Support", to: "/contact" },
    { label: "Code of Conduct", to: "/coming-soon" },
  ];

  return (
    <S.FooterContainer>
      <S.FooterContent>
        <FooterColumn title="PLAY" links={playLinks} />
        <FooterColumn title="LEARN" links={learnLinks} />
        <FooterColumn title="VISUALS" links={visualLinks} />
        <FooterColumn title="HANG OUT" links={hangOutLinks} />
        <FooterColumn title="OTHER" links={otherLinks} />
      </S.FooterContent>

      <S.BottomBar>
        <S.BrandingGroup>
          <S.FooterLogo src={logo} alt="BlackHandStudio Logo" />
          <S.CopyrightText>
            <span>© 2026 BlackHandStudio</span>
            {/* <span className="separator">•</span>
            <Link to="/legal/termofuse">Terms of Use & Privacy Policy</Link> */}
          </S.CopyrightText>
        </S.BrandingGroup>

        <S.SocialIcons>
          <a
            href="https://discord.com/invite/47YskyYJcy"
            target="_blank"
            rel="noreferrer"
          >
            <img src={discordIcon} alt="Discord" />
          </a>
          <a
            href="https://www.twitch.tv/playdarkwest"
            target="_blank"
            rel="noreferrer"
          >
            <img src={twitchIcon} alt="Twitch" />
          </a>
          <a
            href="https://www.instagram.com/playdarkwest/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://x.com/PlayDarkWest" target="_blank" rel="noreferrer">
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <a
            href="https://www.youtube.com/@PlayTheDarkWest"
            target="_blank"
            rel="noreferrer"
          >
            <img src={youtubeIcon} alt="Youtube" />
          </a>
          <a
            href="https://www.reddit.com/r/TheDarkWest/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={redditIcon} alt="Reddit" />
          </a>
        </S.SocialIcons>
      </S.BottomBar>
    </S.FooterContainer>
  );
};

export default Footer;