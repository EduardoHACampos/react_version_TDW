import { useState, useRef } from "react";
import * as S from "./styles";

import Modal, { FormField } from "../../components/common/Modal";
import ScrollToast from "../../components/common/ScrollToast";
import { submitJoinTheHuntForm } from "../../services/api";

import mainLogo from "../../assets/TDWLOGO_Main.png";
import steamLogo from "../../assets/steam_logo.png";
import discordIcon from "../../assets/Discord.png";
import useIntersectionObserver from './../../hooks/useIntersectionObserver';
import { joinHuntSchema } from "../../utils/schemas";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trailerRef = useRef<HTMLDivElement>(null);
  const [isToastPermanentlyClosed, setIsToastPermanentlyClosed] =
    useState(false);

  const isTrailerVisible = useIntersectionObserver(trailerRef, {
    threshold: 0.5,
  });
  const showToast = !isToastPermanentlyClosed && !isTrailerVisible;

  const handleScrollToTrailer = () => {
    trailerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const joinHuntFields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Your full name",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "your@email.com",
      required: true,
    },
  ];

  const handleHuntSubmit = async (formData: Record<string, string>) => {
    await submitJoinTheHuntForm({
      name: formData.name,
      email: formData.email,
    });
  };

  return (
    <S.HomeContainer>
      <S.HeroSection>
        <S.MainTitle src={mainLogo} alt="The Dark West Logo" />
        <S.HuntButtonWrapper>
          <a
            href="#"
            id="joinHuntButton"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            JOIN THE HUNT
          </a>
        </S.HuntButtonWrapper>
        <S.PlatformContainer>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://store.steampowered.com/app/3574750/The_Dark_West/"
          >
            <img src={steamLogo} alt="Steam" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://discord.gg/47YskyYJcy"
          >
            <img src={discordIcon} alt="Discord" />
          </a>
        </S.PlatformContainer>
      </S.HeroSection>

      <S.TrailerSection ref={trailerRef}>
        <iframe
          className="trailer-video"
          src="https://www.youtube.com/embed/3ATksauvGMw"
          title="The Dark West Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </S.TrailerSection>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Join The Hunt"
        subtitle="Enter your name and email to get updates and be part of the adventure."
        fields={joinHuntFields}
        buttonText="Subscribe"
        onSubmit={handleHuntSubmit}
        successMessage="Subscription successful! Welcome, hunter."
        errorMessage="An error occurred. Please try again later."
        validationSchema={joinHuntSchema}
      />

      <ScrollToast
        isVisible={showToast}
        onClose={() => setIsToastPermanentlyClosed(true)}
        onScroll={handleScrollToTrailer}
        text="Watch the official trailer!"
      />
    </S.HomeContainer>
  );
};

export default Home;
