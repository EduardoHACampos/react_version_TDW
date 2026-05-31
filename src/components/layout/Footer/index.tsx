import * as S from "./styles";
import FooterColumn from "./FooterColumn";
import logo from "../../../assets/TheDarkWest_TextWithFlourish.png";
import discordIcon from "../../../assets/Discord.png";
import instagramIcon from "../../../assets/Instagram.svg";
import twitchIcon from "../../../assets/Twitch.svg";
import twitterIcon from "../../../assets/Twitter.svg";
import redditIcon from "../../../assets/Reddit.svg";
import youtubeIcon from "../../../assets/youtube-icon.svg";

interface FooterLinkItem {
  label: string;
  to?: string;
  href?: string;
}

const isAvailableFooterLink = (link: FooterLinkItem) =>
  link.to !== "/coming-soon";

const Footer = () => {
  const playLinks: FooterLinkItem[] = [
    { label: "Download", to: "/coming-soon" },
    { label: "Patch Notes", to: "/news" },
    {
      label: "Supporter Packs",
      to: "/coming-soon",
    },
    {
      label: "Steam Store",
      href: "https://store.steampowered.com/app/3574750/The_Dark_West/",
    },
    { label: "Twitch Drops", to: "/coming-soon" },
  ];

  const learnLinks: FooterLinkItem[] = [
    { label: "Skill System", to: "/coming-soon" },
    { label: "Items & Crafting", to: "/coming-soon" },
    { label: "End Game", to: "/coming-soon" },
    { label: "Classes", to: "/coming-soon" },
    { label: "World & Story", to: "/coming-soon" },
  ];

  const visualLinks: FooterLinkItem[] = [
    { label: "Wallpapers", to: "/coming-soon" },
    { label: "PNG's", to: "/coming-soon" },
    { label: "Mobile / Desktop", to: "/coming-soon" },
  ];

  const hangOutLinks: FooterLinkItem[] = [
    { label: "Forum", to: "/coming-soon" },
    { label: "Discord", href: "https://discord.gg/47YskyYJcy" },
    { label: "r/TheDarkWest", href: "https://www.reddit.com/r/TheDarkWest/" },
  ];

  const otherLinks: FooterLinkItem[] = [
    { label: "Careers", to: "/opportunities" },
    {
      label: "Press Kit",
      href: "https://the-dark-west.b-cdn.net/press-kit/TheDarkWest-PressKit.zip",
    },
    { label: "Contact Support", to: "/contact" },
    { label: "Code of Conduct", to: "/coming-soon" },
  ];

  const footerSections = [
    { title: "PLAY", links: playLinks.filter(isAvailableFooterLink) },
    { title: "LEARN", links: learnLinks.filter(isAvailableFooterLink) },
    { title: "VISUALS", links: visualLinks.filter(isAvailableFooterLink) },
    { title: "HANG OUT", links: hangOutLinks.filter(isAvailableFooterLink) },
    { title: "OTHER", links: otherLinks.filter(isAvailableFooterLink) },
  ].filter((section) => section.links.length > 0);

  return (
    <S.FooterContainer>
      <S.FooterContent>
        {footerSections.map((section) => (
          <FooterColumn
            key={section.title}
            title={section.title}
            links={section.links}
          />
        ))}
      </S.FooterContent>

      <S.BottomBar>
        <S.BrandingGroup>
          <S.FooterLogo src={logo} alt="BlackHandStudio Logo" />
          <S.CopyrightText>
            <span>© 2026 BlackHandStudio</span>
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
