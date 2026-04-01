
import { useState } from "react";
import * as S from "./styles";

import Modal, { FormField } from "../../components/common/Modal";
import { submitJoinTheHuntForm } from "../../services/api";

import mainLogo from "../../assets/TheDarkWest_Logo.png";
import steamLogo from "../../assets/steam_logo.png";
import discordIcon from "../../assets/Discord.png";
import RuneAction from "../../components/common/RuneAction";

import { joinHuntSchema } from "../../utils/schemas";

const liveStreamers = ["playdarkwest"]; 

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTwitchVisible, setIsTwitchVisible] = useState(true); 

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

        <S.VideoWrapper>
          <iframe
            src="https://www.youtube.com/embed/JPFiWf1VkTg?autoplay=1&mute=1"
            title="The Dark West - Official Reveal Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </S.VideoWrapper>

        {/* <S.HuntButtonWrapper>
          <RuneAction
            text="JOIN THE HUNT"
            size={32}
            onClick={() => setIsModalOpen(true)}
            className="hunt-rune-action"
          />
        </S.HuntButtonWrapper> */}

        <S.BottomActions>
          <S.ActionLink 
            href="https://store.steampowered.com/app/3574750/The_Dark_West/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <S.ActionIcon src={steamLogo} alt="Steam" className="steam-icon" />
          </S.ActionLink>

          <S.ActionLink 
            href="https://discord.gg/47YskyYJcy" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <S.ActionIcon src={discordIcon} alt="Discord" className="discord-icon" />
          </S.ActionLink>

          <S.ActionButton onClick={() => setIsModalOpen(true)}>
            <S.ActionIcon src={discordIcon} alt="Newsletter" className="newsletter-icon" />
          </S.ActionButton>
        </S.BottomActions>

  
        {liveStreamers.length > 0 && isTwitchVisible && (
          <S.FloatingTwitchContainer>
            <S.TwitchHeader>
              <S.FloatingStreamTitle>Live Now</S.FloatingStreamTitle>
              <S.CloseTwitchButton onClick={() => setIsTwitchVisible(false)} title="Close Stream">
                &times;
              </S.CloseTwitchButton>
            </S.TwitchHeader>
            
            {liveStreamers.map((streamer) => (
              <S.FloatingStreamWrapper key={streamer}>
                <S.IframeWrapper>
                  <iframe
                    src={`https://player.twitch.tv/?channel=${streamer}&parent=localhost&muted=true`}
                    allowFullScreen>
                  </iframe>
                </S.IframeWrapper>
                <S.StreamerInfo>
                  <span className="playing">Playing The Dark West</span>
                </S.StreamerInfo>
              </S.FloatingStreamWrapper>
            ))}
          </S.FloatingTwitchContainer>
        )}

      </S.HeroSection>

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
    </S.HomeContainer>
  );
};

export default Home;