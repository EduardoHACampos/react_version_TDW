// src/constants/links/index.ts
export const CDN_BASE_URL: string = "https://the-dark-west.b-cdn.net";

export const getAssetUrl = (path: string): string => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${CDN_BASE_URL}/${cleanPath}`;
};
