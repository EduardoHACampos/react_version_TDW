/*
 English: 
 FAQ Card component updated with a Domino Rune Decoding effect using the provided SVG paths.
 When opened, it replaces the unrevealed characters with random runic SVG paths from RUNE_DICTIONARY_PATHS.
 It incrementally reveals the true characters from left to right, creating a matrix-like decoding animation.
 
 Explicação em português aqui: 
 Componente FAQ Card atualizado com um efeito de Descodificação de Runas em Dominó utilizando os paths SVG fornecidos.
 Quando aberto, substitui os caracteres não revelados por paths SVG rúnicos aleatórios de RUNE_DICTIONARY_PATHS.
 Revela incrementalmente os caracteres verdadeiros da esquerda para a direita, criando uma animação de descodificação ao estilo Matrix.
 
 Caminho / Path: src/components/common/FAQCard/index.tsx
*/

import React, { useState, useRef, useEffect } from "react";
import * as S from "./styles";
import { RUNE_DICTIONARY_PATHS } from "../../../constants/runes";

interface FAQCardProps {
  question: string;
  answer: string;
}

// English: Extract available rune keys, excluding empty spaces / Explicação em português aqui: Extrai as chaves de runas disponíveis, excluindo espaços vazios
const RUNE_KEYS = Object.keys(RUNE_DICTIONARY_PATHS).filter(k => k !== " ");

const FAQCard: React.FC<FAQCardProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setRevealedCount(0);
      
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      const totalChars = answer.length;
      // English: Dynamic speed to ensure long answers decode in a reasonable time / Explicação em português aqui: Velocidade dinâmica para garantir que respostas longas sejam descodificadas num tempo razoável
      const lettersPerTick = Math.max(1, Math.floor(totalChars / 40)); 
      let currentCount = 0;

      intervalRef.current = setInterval(() => {
        currentCount += lettersPerTick;
        if (currentCount >= totalChars) {
          currentCount = totalChars;
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        setRevealedCount(currentCount);
      }, 30); // 30ms per tick for a smooth hacker-like flashing effect / 30ms por tick para um efeito de piscar suave ao estilo hacker
    } else {
      setIsOpen(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const renderAnswer = () => {
    return answer.split("").map((char, index) => {
      // English: If the character index is lower than the revealed count, show the real letter / Explicação em português aqui: Se o índice do caractere for menor que a contagem revelada, mostra a letra real
      if (index < revealedCount) {
        return <span key={index}>{char}</span>;
      }
      
      // English: Preserve spaces to prevent the layout from jumping / Explicação em português aqui: Preserva os espaços para evitar que o layout salte
      if (char === " ") {
        return <span key={index}> </span>;
      }
      
      // English: Otherwise, show a randomly flashing rune SVG / Explicação em português aqui: Caso contrário, mostra um SVG de runa a piscar aleatoriamente
      const randomKey = RUNE_KEYS[Math.floor(Math.random() * RUNE_KEYS.length)];
      const path = RUNE_DICTIONARY_PATHS[randomKey] || RUNE_DICTIONARY_PATHS["A"];
      
      return (
        <S.RuneSvg key={index} viewBox="0 0 1024 1024">
          <path d={path} fill="currentColor" />
        </S.RuneSvg>
      );
    });
  };

  return (
    <S.CardContainer $isOpen={isOpen}>
      <S.CardHeader onClick={toggleOpen} aria-expanded={isOpen}>
        <S.QuestionTitle $isOpen={isOpen}>{question}</S.QuestionTitle>
        <S.ToggleIcon $isOpen={isOpen}>+</S.ToggleIcon>
      </S.CardHeader>
      <S.CardBody $isOpen={isOpen}>
        <S.AnswerContent>
          <p>{isOpen ? renderAnswer() : ""}</p>
        </S.AnswerContent>
      </S.CardBody>
    </S.CardContainer>
  );
};

export default FAQCard;