/*
Main component for the FAQ page.
Renders the layout, page headers, and iterates through the category data to display FAQ cards.

Componente principal da página de FAQ.
Renderiza o layout, os cabeçalhos da página e itera pelos dados de categoria para exibir os cartões de FAQ.
*/

import React from "react";
import * as S from "./styles";
import { faqContent } from "./content";
import FAQCard from "../../components/common/FAQCard";

const FAQ: React.FC = () => {
  return (
    <S.PageWrapper>
      <S.HeaderSection>
        <h1>{faqContent.pageTitle}</h1>
        <p>{faqContent.pageSubtitle}</p>
      </S.HeaderSection>

      <S.ContentContainer>
        {faqContent.categories.map((category, index) => (
          <S.CategoryBlock key={index}>
            <S.CategoryTitle>{category.title}</S.CategoryTitle>
            
            {category.items.map((item, itemIndex) => (
              <FAQCard 
                key={itemIndex} 
                question={item.question} 
                answer={item.answer} 
              />
            ))}
          </S.CategoryBlock>
        ))}
      </S.ContentContainer>
    </S.PageWrapper>
  );
};

export default FAQ;