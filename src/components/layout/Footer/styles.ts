import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: var(--color-background-dark);
  padding: 3rem 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  @media (min-width: 1024px) {
    padding: 4rem 5% 2rem;
  }
`;

export const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 2rem;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.85rem;

  h2 {
    font-family: var(--font-primary);
    color: var(--color-primary-text);
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  a {
    font-family: var(--font-primary);
    color: var(--color-primary-text);
    text-decoration: none;
    font-size: 12px;
    transition: color 0.3s ease, text-shadow 0.3s ease;
    opacity: 0.8;

    &:hover {
      color: var(--color-hover-purple);
      opacity: 1;
      text-shadow: 0 0 8px rgba(167, 150, 255, 0.25);
    }
  }
`;

export const BottomBar = styled.div`
  margin-top: 1rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
`;

export const BrandingGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

export const FooterLogo = styled.img`
  height: 55px;
  width: auto;
  opacity: 0.9;

  @media (min-width: 1024px) {
    height: 40px;
  }
`;

export const CopyrightText = styled.div`
  font-family: var(--font-primary);
  color: var(--color-primary-text);
  font-size: 12px;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  .separator {
    display: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-hover-purple);
    }
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 0.4rem;

    .separator {
      display: inline;
    }
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  img {
    height: 20px;
    width: auto;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.15);
    }
  }
`;
