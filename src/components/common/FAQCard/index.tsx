import React, { useState, useRef, useEffect } from "react";
import * as S from "./styles";
import { RUNE_DICTIONARY_PATHS } from "../../../constants/runes";

interface FAQCardProps {
  question: string;
  answer: string;
}

const RUNE_KEYS = Object.keys(RUNE_DICTIONARY_PATHS).filter((k) => k !== " ");

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
      if (index < revealedCount) {
        return <span key={index}>{char}</span>;
      }

      if (char === " ") {
        return <span key={index}> </span>;
      }

      const randomKey = RUNE_KEYS[Math.floor(Math.random() * RUNE_KEYS.length)];
      const path =
        RUNE_DICTIONARY_PATHS[randomKey] || RUNE_DICTIONARY_PATHS["A"];

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
