import styled from "styled-components";
import { encodeOccultText } from "../../../utils/occultEncoder";

/**
 * Sets styling that prevents direct interaction with the hidden text.
 * ---
 * Define a estilização que impede a interação direta com o texto oculto.
 */
const HiddenSpan = styled.span`
  font-family: 'Witchcraft', serif;
  user-select: none; /* Prevents text copying / Impede a cópia do texto */
  -webkit-user-select: none;
  pointer-events: none; /* Disables clicks / Desativa cliques */
`;

interface OccultTextProps {
  text: string;
}

const OccultText = ({ text }: OccultTextProps) => {
  /**
   * Converts the readable string into scrambled characters before rendering.
   * ---
   * Converte a string legível em caracteres embaralhados antes da renderização.
   */
  const encoded = encodeOccultText(text);

  return (
    <HiddenSpan aria-hidden="true">
      {encoded}
    </HiddenSpan>
  );
};

export default OccultText;