import { Link } from "react-router-dom";
import styled from "styled-components";
import newsBackground from "../../assets/TheDarkWest_KeyArt_NoLogo_3840x2160.avif";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 140px 1.5rem 4rem;
  background-image:
    linear-gradient(180deg, rgba(0, 0, 0, 0.84) 0%, rgba(0, 0, 0, 0.96) 100%),
    url(${newsBackground});
  background-size: cover;
  background-position: center top;
  display: flex;
  justify-content: center;
`;

export const PageWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BackLink = styled(Link)`
  align-self: flex-start;
  color: var(--color-primary-text);
  text-decoration: none;
  font-size: 0.92rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color 0.25s ease;

  &:hover {
    color: var(--color-hover-purple);
  }
`;

export const StatusMessage = styled.div<{ $isError?: boolean }>`
  padding: 1rem 1.25rem;
  border-radius: 16px;
  border: 1px solid
    ${({ $isError }) =>
      $isError ? "rgba(255, 92, 92, 0.55)" : "rgba(255, 221, 150, 0.26)"};
  background:
    ${({ $isError }) =>
      $isError ? "rgba(80, 12, 12, 0.4)" : "rgba(10, 10, 10, 0.8)"};
  color:
    ${({ $isError }) =>
      $isError ? "#ffd6d6" : "rgba(255, 244, 223, 0.92)"};
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const HeaderCard = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 221, 150, 0.16);
  background: rgba(8, 8, 8, 0.78);
  backdrop-filter: blur(10px);
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const TypeBadge = styled.span`
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(167, 150, 255, 0.14);
  color: var(--color-primary-text);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const MetaText = styled.span`
  color: rgba(255, 244, 223, 0.7);
  font-size: 0.9rem;
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: #fff;
  font-size: clamp(2.1rem, 4vw, 3.2rem);
  line-height: 1.2;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const Summary = styled.div`
  color: rgba(255, 244, 223, 0.86);
  font-size: 1.04rem;
  line-height: 1.8;
  overflow-wrap: anywhere;
  word-break: break-word;

  p,
  ul,
  ol {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ul,
  ol {
    padding-left: 1.5rem;
    list-style-position: outside;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin-bottom: 0.4rem;
    padding-left: 0.05rem;
  }

  li::marker {
    color: rgba(255, 244, 223, 0.88);
    font-weight: 700;
  }

  a {
    color: var(--color-hover-purple);
  }

  strong,
  em,
  u {
    color: #fff;
  }

  [data-spoiler="true"] {
    padding: 0.05rem 0.28rem;
    border-radius: 0.35rem;
    background: linear-gradient(
      135deg,
      rgba(167, 150, 255, 0.34),
      rgba(255, 221, 150, 0.18)
    );
    color: transparent;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px rgba(255, 221, 150, 0.18);
    transition:
      color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  [data-spoiler="true"]:hover,
  [data-spoiler="true"]:focus,
  [data-spoiler="true"][data-revealed="true"] {
    color: #fff;
    background: rgba(167, 150, 255, 0.2);
    box-shadow: inset 0 0 0 1px rgba(255, 221, 150, 0.3);
  }
`;

export const AuthorLine = styled.p`
  margin: 0;
  color: rgba(255, 244, 223, 0.66);
  font-size: 0.92rem;
`;

export const FeaturedImage = styled.img`
  width: 100%;
  max-height: 520px;
  border-radius: 24px;
  object-fit: cover;
  border: 1px solid rgba(255, 221, 150, 0.16);
  background: #0d0d0d;
`;

export const ContentCard = styled.section`
  padding: 2rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 221, 150, 0.16);
  background: rgba(8, 8, 8, 0.82);
  backdrop-filter: blur(10px);
`;

export const RichText = styled.div`
  color: rgba(255, 244, 223, 0.9);
  font-size: 1rem;
  line-height: 1.85;
  overflow-wrap: anywhere;
  word-break: break-word;

  h1,
  h2,
  h3,
  h4 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--color-primary-text);
  }

  p,
  ul,
  ol,
  blockquote,
  pre {
    margin-top: 0;
    margin-bottom: 1.25rem;
  }

  a {
    color: var(--color-hover-purple);
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 18px;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 3px solid rgba(167, 150, 255, 0.45);
    color: rgba(255, 244, 223, 0.78);
  }

  ul,
  ol {
    padding-left: 1.5rem;
    list-style-position: outside;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin-bottom: 0.4rem;
    padding-left: 0.05rem;
  }

  li::marker {
    color: rgba(255, 244, 223, 0.88);
    font-weight: 700;
  }

  pre {
    overflow-x: auto;
    padding: 1rem;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.5);
  }

  [data-spoiler="true"] {
    padding: 0.05rem 0.28rem;
    border-radius: 0.35rem;
    background: linear-gradient(
      135deg,
      rgba(167, 150, 255, 0.34),
      rgba(255, 221, 150, 0.18)
    );
    color: transparent;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px rgba(255, 221, 150, 0.18);
    transition:
      color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  [data-spoiler="true"]:hover,
  [data-spoiler="true"]:focus,
  [data-spoiler="true"][data-revealed="true"] {
    color: #fff;
    background: rgba(167, 150, 255, 0.2);
    box-shadow: inset 0 0 0 1px rgba(255, 221, 150, 0.3);
  }
`;

export const GallerySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const GalleryTitle = styled.h2`
  margin: 0;
  font-size: 1.6rem;
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

export const GalleryImage = styled.img`
  width: 100%;
  min-height: 180px;
  border-radius: 18px;
  object-fit: cover;
  border: 1px solid rgba(255, 221, 150, 0.16);
`;
