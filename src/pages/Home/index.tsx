import { useEffect, useState } from "react";
import * as S from "./styles";

import Modal, { FormField } from "../../components/common/Modal";
import {
  submitJoinTheHuntForm,
  unsubscribeFromNewsletter,
} from "../../services/api";

import mainLogo from "../../assets/TheDarkWest_Logo.png";
import steamLogo from "../../assets/steam_logo.png";
import discordIcon from "../../assets/Discord.png";

import { joinHuntSchema, newsletterUnsubscribeSchema } from "../../utils/schemas";

const liveStreamers = ["playdarkwest"];
const demoLaunchDate = new Date("2026-06-03T00:00:00-07:00");

const getCountdownUnits = () => {
  const remainingTime = Math.max(0, demoLaunchDate.getTime() - Date.now());
  const seconds = Math.floor(remainingTime / 1000);

  return [
    { label: "Days", value: Math.floor(seconds / 86400) },
    { label: "Hours", value: Math.floor((seconds % 86400) / 3600) },
    { label: "Minutes", value: Math.floor((seconds % 3600) / 60) },
    { label: "Seconds", value: seconds % 60 },
  ];
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsletterMode, setNewsletterMode] = useState<"subscribe" | "unsubscribe">(
    "subscribe",
  );
  const [isTwitchVisible, setIsTwitchVisible] = useState(true);
  const [countdownUnits, setCountdownUnits] = useState(getCountdownUnits);
  const currentDomain = window.location.hostname;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdownUnits(getCountdownUnits());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

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

  const unsubscribeFields: FormField[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "your@email.com",
      required: true,
    },
  ];

  const isSubscribeMode = newsletterMode === "subscribe";

  const openNewsletterModal = () => {
    setNewsletterMode("subscribe");
    setIsModalOpen(true);
  };

  const handleHuntSubmit = async (formData: Record<string, string>) => {
    const response = await submitJoinTheHuntForm({
      name: formData.name,
      email: formData.email,
    });

    if (response.message === "This email is already subscribed.") {
      return "You're already subscribed to the newsletter.";
    }

    return "Subscription successful! Welcome, hunter.";
  };

  const handleNewsletterUnsubscribe = async (
    formData: Record<string, string>,
  ) => {
    const response = await unsubscribeFromNewsletter({
      email: formData.email,
    });

    return response.message;
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
            <S.ActionIcon
              src={discordIcon}
              alt="Discord"
              className="discord-icon"
            />
          </S.ActionLink>

          <S.ActionButton onClick={openNewsletterModal}>
            Newsletter
          </S.ActionButton>
        </S.BottomActions>

        <S.CountdownPanel aria-label="Countdown to The Dark West demo">
          <S.CountdownFrame
            viewBox="0 0 760 116"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="countdownStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(124, 74, 18, 0)" />
                <stop offset="17%" stopColor="#9f6a1d" />
                <stop offset="50%" stopColor="#e0ae54" />
                <stop offset="83%" stopColor="#9f6a1d" />
                <stop offset="100%" stopColor="rgba(124, 74, 18, 0)" />
              </linearGradient>
            </defs>
            <path
              d="M42 34H718L744 58L718 82H42L16 58L42 34Z"
              fill="rgba(7, 5, 4, 0.68)"
              stroke="url(#countdownStroke)"
              strokeWidth="1.5"
            />
            <path
              d="M25 58H138M622 58H735M190 34V82M380 34V82M570 34V82"
              stroke="rgba(205, 144, 47, 0.36)"
              strokeWidth="1"
            />
          </S.CountdownFrame>

          <S.CountdownContent>
            <S.CountdownEyebrow>Demo releases June 3 PDT</S.CountdownEyebrow>

            <S.CountdownGrid>
              {countdownUnits.map((unit) => (
                <S.CountdownUnit key={unit.label}>
                  <S.CountdownValue>
                    {String(unit.value).padStart(2, "0")}
                  </S.CountdownValue>
                  <S.CountdownLabel>{unit.label}</S.CountdownLabel>
                </S.CountdownUnit>
              ))}
            </S.CountdownGrid>
          </S.CountdownContent>
        </S.CountdownPanel>

        {liveStreamers.length > 0 && isTwitchVisible && (
          <S.FloatingTwitchContainer>
            <S.TwitchHeader>
              <S.FloatingStreamTitle>Live Now</S.FloatingStreamTitle>
              <S.CloseTwitchButton
                onClick={() => setIsTwitchVisible(false)}
                title="Close Stream"
              >
                &times;
              </S.CloseTwitchButton>
            </S.TwitchHeader>

            {liveStreamers.map((streamer) => (
              <S.FloatingStreamWrapper key={streamer}>
                <S.IframeWrapper>
                  <iframe
                    src={`https://player.twitch.tv/?channel=${streamer}&parent=${currentDomain}&muted=true`}
                    allowFullScreen
                  />
                </S.IframeWrapper>
              </S.FloatingStreamWrapper>
            ))}
          </S.FloatingTwitchContainer>
        )}
      </S.HeroSection>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isSubscribeMode ? "Join The Hunt" : "Newsletter Preferences"}
        subtitle={
          isSubscribeMode
            ? "Enter your name and email to get updates and be part of the adventure."
            : "Enter your email to stop receiving newsletter updates."
        }
        fields={isSubscribeMode ? joinHuntFields : unsubscribeFields}
        buttonText={isSubscribeMode ? "Subscribe" : "Unsubscribe"}
        onSubmit={isSubscribeMode ? handleHuntSubmit : handleNewsletterUnsubscribe}
        successMessage={
          isSubscribeMode
            ? "Subscription successful! Welcome, hunter."
            : "If this email is subscribed, it has been unsubscribed successfully."
        }
        errorMessage={
          isSubscribeMode
            ? "We couldn't complete your subscription right now. Please try again later."
            : "We couldn't process your unsubscribe right now. Please try again later."
        }
        validationSchema={
          isSubscribeMode ? joinHuntSchema : newsletterUnsubscribeSchema
        }
        footerContent={
          <S.ModalModeButton
            type="button"
            onClick={() =>
              setNewsletterMode((currentMode) =>
                currentMode === "subscribe" ? "unsubscribe" : "subscribe",
              )
            }
          >
            {isSubscribeMode ? "Need to unsubscribe?" : "Back to subscribe"}
          </S.ModalModeButton>
        }
      />
    </S.HomeContainer>
  );
};

export default Home;
