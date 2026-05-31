import { Link } from "react-router-dom";
import styled from "styled-components";
import newsBackground from "../../assets/TheDarkWest_KeyArt_NoLogo_3840x2160.avif";

export const NewsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 140px 1.5rem 4rem;
  background-image:
    linear-gradient(180deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.94) 100%),
    url(${newsBackground});
  background-size: cover;
  background-position: center top;
  display: flex;
  justify-content: center;
`;

export const NewsWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const HeroSection = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const HeroHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const HeroLink = styled.a`
  color: var(--color-primary-text);
  font-size: 0.92rem;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.25s ease;

  &:hover {
    color: var(--color-hover-purple);
  }
`;

export const PageSubtitle = styled.p`
  max-width: 720px;
  margin: 0;
  color: rgba(255, 244, 223, 0.82);
  font-size: 1rem;
  line-height: 1.7;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? "var(--color-primary-text)" : "rgba(255, 221, 150, 0.35)"};
  background:
    ${({ $isActive }) =>
      $isActive
        ? "linear-gradient(135deg, rgba(167, 150, 255, 0.24), rgba(0, 0, 0, 0.72))"
        : "rgba(0, 0, 0, 0.45)"};
  color:
    ${({ $isActive }) =>
      $isActive ? "var(--color-primary-text)" : "var(--color-text-light)"};
  font-family: var(--font-primary);
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    background 0.25s ease;

  &:hover {
    border-color: var(--color-hover-purple);
    color: var(--color-primary-text);
    transform: translateY(-1px);
  }
`;

export const StatusMessage = styled.div<{ $isError?: boolean }>`
  padding: 1rem 1.25rem;
  border-radius: 14px;
  border: 1px solid
    ${({ $isError }) =>
      $isError ? "rgba(255, 92, 92, 0.5)" : "rgba(255, 221, 150, 0.28)"};
  background:
    ${({ $isError }) =>
      $isError ? "rgba(90, 12, 12, 0.35)" : "rgba(10, 10, 10, 0.75)"};
  color:
    ${({ $isError }) =>
      $isError ? "#ffd3d3" : "rgba(255, 244, 223, 0.92)"};
  font-size: 0.98rem;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const StatusContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const PublicationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const PublicationCard = styled.article`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(255, 221, 150, 0.16);
  background: rgba(8, 8, 8, 0.78);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(10px);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(167, 150, 255, 0.6);
    box-shadow: 0 22px 52px rgba(0, 0, 0, 0.4);
  }
`;

export const RedditCard = styled.article`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(167, 150, 255, 0.24);
  background: rgba(18, 16, 28, 0.82);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(10px);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(167, 150, 255, 0.58);
    box-shadow: 0 22px 52px rgba(0, 0, 0, 0.4);
  }
`;

export const RedditCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(167, 150, 255, 0.12);
`;

export const RedditAuthor = styled.span`
  color: var(--color-hover-purple);
  font-size: 0.92rem;
  font-weight: 600;
`;

export const RedditCardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.35rem 1.5rem 1.5rem;
`;

export const RedditBodyText = styled.p`
  margin: 0;
  color: rgba(255, 244, 223, 0.82);
  font-size: 0.98rem;
  line-height: 1.8;
  overflow-wrap: anywhere;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const RedditCardFooter = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 210px;
  object-fit: cover;
  display: block;
`;

export const ImagePlaceholder = styled.div`
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background:
    linear-gradient(135deg, rgba(167, 150, 255, 0.28), rgba(0, 0, 0, 0.88)),
    radial-gradient(circle at top, rgba(255, 221, 150, 0.18), transparent 55%);
  color: var(--color-primary-text);
  font-family: var(--font-heading);
  font-size: 1.2rem;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
`;

export const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const TypeBadge = styled.span`
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  background: rgba(167, 150, 255, 0.14);
  color: var(--color-primary-text);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const MetaText = styled.span`
  color: rgba(255, 244, 223, 0.66);
  font-size: 0.85rem;
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: #fff;
  font-size: 1.35rem;
  line-height: 1.35;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const CardSummary = styled.p`
  margin: 0;
  color: rgba(255, 244, 223, 0.8);
  font-size: 0.98rem;
  line-height: 1.75;
  overflow-wrap: anywhere;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const ReadMoreLink = styled(Link)`
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

export const ExternalReadLink = styled.a`
  color: var(--color-hover-purple);
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color 0.25s ease;

  &:hover {
    color: var(--color-primary-text);
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const PageButton = styled.button<{ $isActive: boolean }>`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? "var(--color-primary-text)" : "rgba(255, 221, 150, 0.28)"};
  background:
    ${({ $isActive }) =>
      $isActive
        ? "linear-gradient(135deg, rgba(167, 150, 255, 0.55), rgba(70, 45, 120, 0.95))"
        : "rgba(0, 0, 0, 0.55)"};
  color:
    ${({ $isActive }) =>
      $isActive ? "var(--color-primary-text)" : "var(--color-text-light)"};
  font-family: var(--font-heading);
  font-size: 1rem;
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    transform 0.25s ease,
    background 0.25s ease;

  &:hover {
    border-color: var(--color-hover-purple);
    transform: translateY(-1px);
  }
`;
