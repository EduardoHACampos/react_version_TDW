import styled from "styled-components";

export const FooterContainer = styled.footer`
  
  background-color: #000000; 

  color: white;
  padding: 40px 20px;
  font-family: "Kirsty", sans-serif;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: center; 
  flex-wrap: wrap;
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
  margin-bottom: 20px;
  max-width: 1200px;
  margin: 0 auto 20px auto;
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  text-align: center;
  margin: 20px;
  flex-direction: column;

  h2 {
    font-family: "Kirsty", sans-serif;

    letter-spacing: 2px;
    font-size: 1.2rem;
  }
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const SocialIcons = styled.div`
  a {
    margin: 0 10px;
  }

  img {
    width: 30px;
    height: 30px;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Copyright = styled.div`
  text-align: center;
  padding-top: 15px; 
`;
