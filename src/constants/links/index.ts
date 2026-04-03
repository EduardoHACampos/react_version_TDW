export const CDN_BASE_URL: string = "https://the-dark-west.b-cdn.net";

export const getAssetUrl = (path: string): string => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${CDN_BASE_URL}/${cleanPath}`;
};

// Coluna GAME (Footer)
export const GAME_LINKS = [
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "The Goal", to: "/the-goal" },
  { label: "Opportunities", to: "/opportunities" },
  { label: "Contact", to: "/contact" },
  { label: "Forum", to: "/coming-soon" }, 
  { label: "Ladders", to: "/coming-soon" }, 
  { label: "Downloads", to: "/coming-soon" }, 
];

// Coluna VISUALS (Todos - Footer)
export const VISUALS_LINKS = [
  { label: "Trailers", to: "/coming-soon" }, 
  { label: "Screenshots", to: "/coming-soon" }, 
  { label: "Concept Art", to: "/coming-soon" }, 
];

// Coluna LEARN (Todos - Footer)
export const LEARN_LINKS = [
  { label: "Community Wiki", to: "/coming-soon" }, 
  { label: "Class Overviews", to: "/coming-soon" }, 
  { label: "Item Database", to: "/coming-soon" }, 
];

// Coluna SUPPORT (Footer)
export const SUPPORT_LINKS = [
  { label: "Support Packs", to: "/coming-soon" }, 
  { label: "Twitch Drops", to: "/coming-soon" }, 
];

// Aba SHOP (Header)
export const SHOP_LINKS = [
  { label: "Merchandise", to: "/coming-soon" }, 
  { label: "Digital Items", to: "/coming-soon" }, 
  { label: "Purchase Game", to: "/coming-soon" }, 
  { label: "Founder / Support Pack", to: "/coming-soon" }, 
  { label: "MTX", to: "/coming-soon" }, 
  { label: "Expansions", to: "/coming-soon" }, 
];

// Aba GAME (Header)
export const HEADER_GAME_LINKS = [
  { label: "News", to: "/news" },
  { label: "Ladders", to: "/coming-soon" },
  { label: "Community Wiki", to: "https://wiki.playdarkwest.com", external: true },
  { label: "Download", to: "/coming-soon" },
];