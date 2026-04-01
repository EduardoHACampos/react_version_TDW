import styled from "styled-components";
import newsBackground from "../../assets/TheDarkWest_KeyArt_NoLogo_3840x2160.avif";

export const NewsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 120px 1.5rem 4rem 1.5rem; 
  
  background-image:
    radial-gradient(circle, rgba(15, 15, 20, 0.75) 0%, rgba(10, 10, 15, 0.95) 100%),
    url(${newsBackground});
  background-size: cover;
  background-position: center top;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NewsWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const PageTitle = styled.h1`
  font-family: var(--font-primary);
  color: #fff;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0;
  border-bottom: 2px solid var(--color-hover-purple);
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RedditGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const NewsCard = styled.article`
  background-color: rgba(26, 26, 36, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(167, 150, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--color-hover-purple);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  }
`;

export const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0.5rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(167, 150, 255, 0.1);
  margin-bottom: 1rem;
`;

export const AuthorText = styled.span`
  font-family: var(--font-primary);
  font-size: 0.85rem;
  color: var(--color-hover-purple);
  letter-spacing: 1px;
`;

export const DateText = styled.span`
  font-family: var(--font-primary);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
`;

export const CardContent = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

export const CardTitle = styled.h3`
  font-family: var(--font-primary);
  color: #fff;
  font-size: 1.2rem;
  margin: 0;
  line-height: 1.4;
  
  /* Truncate long titles / Truncar títulos longos */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardBodyText = styled.p`
  font-family: var(--font-primary);
  color: #c7d5e0;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  opacity: 0.85;

  /* Truncate long text / Truncar textos longos */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ReadMoreLink = styled.a`
  margin-top: auto;
  align-self: flex-start;
  font-family: var(--font-primary);
  font-size: 0.9rem;
  color: var(--color-hover-purple);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  padding-top: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

export const LoadingText = styled.div`
  font-family: var(--font-primary);
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  padding: 4rem;
`;