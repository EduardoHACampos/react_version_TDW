/*
Main Footer component with grouped navigation links and bottom branding/socials area.
Corrected to include missing Instagram icon and maintain Mobile First layout.

Componente principal do rodapé com links de navegação agrupados e área inferior de branding/socials.
Corrigido para incluir o ícone do Instagram faltante e manter o layout Mobile First.
*/
import { Link } from "react-router-dom";
import * as S from "./styles";
import FooterColumn from "./FooterColumn";

/* Assets */
import logo from "../../../assets/TheDarkWest_TextWithFlourish.png";
import discordIcon from "../../../assets/Discord.png";
import instagramIcon from "../../../assets/Instagram.svg"; // Re-added / Reinserido
import twitchIcon from "../../../assets/Twitch.svg"; // Adding Twitch to match previous set
import twitterIcon from "../../../assets/Twitter.svg";
import redditIcon from "../../../assets/reddit.svg";
import youtubeIcon from "../../../assets/youtube.svg";

const Footer = () => {
  const playLinks = [
    { label: "Download", to: "/game/download" },
    { label: "Patch Notes", to: "/news/patch-notes" },
    { label: "Supporter Packs", to: "/shop/supporter-packs" },
    { label: "Steam Store", href: "https://store.steampowered.com" },
    { label: "Twitch Drops", to: "/events/twitch-drops" },
  ];

  const learnLinks = [
    { label: "Skill System", to: "/wiki/skills" },
    { label: "Items & Crafting", to: "/wiki/items" },
    { label: "End Game", to: "/wiki/endgame" },
    { label: "Classes", to: "/wiki/classes" },
    { label: "World & Story", to: "/wiki/lore" },
  ];

  const visualLinks = [
    { label: "Wallpapers", to: "/media/wallpapers" },
    { label: "PNG's", to: "/media/pngs" },
    { label: "Mobile / Desktop", to: "/media/formatted" },
  ];

  const hangOutLinks = [
    { label: "Forum", href: "https://forum.playdarkwest.com" },
    { label: "Discord", href: "https://discord.com/invite/47YskyYJcy" },
    { label: "r/TheDarkWest", href: "https://www.reddit.com/r/TheDarkWest/" },
  ];

  const otherLinks = [
    { label: "Careers", to: "/opportunities" },
    { label: "Contact Support", to: "/contact" },
    { label: "Code of Conduct", to: "/legal/eula" },
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
