import React from 'react';
import { Link } from 'react-router-dom';
import * as S from "./styles";

/*
Interface defining the shape of a footer link item.
Interface que define a estrutura de um item de link do rodapé.
*/
interface FooterLinkItem {
  label: string;
  to?: string;
  href?: string;
}

/*
Properties for the FooterColumn component.
Propriedades para o componente FooterColumn.
*/
interface FooterColumnProps {
  title: string;
  links: FooterLinkItem[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  return (
    <S.Section>
      <h2>{title}</h2>
      {links.map((link) => (
        <React.Fragment key={link.label}>
          {link.to ? (
            <Link to={link.to}>{link.label}</Link>
          ) : (
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          )}
        </React.Fragment>
      ))}
    </S.Section>
  );
};

export default FooterColumn;
