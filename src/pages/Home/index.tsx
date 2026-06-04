import { useEffect, useState } from "react";
import * as S from "./styles";

import Modal, { FormField } from "../../components/common/Modal";
import {
  submitJoinTheHuntForm,
  unsubscribeFromNewsletter,
} from "../../services/api";
import { resolveApiUrl } from "../../services/httpClient";

import mainLogo from "../../assets/TheDarkWest_Logo-ui.webp";
import steamLogo from "../../assets/steam_logo.png";
import discordIcon from "../../assets/Discord.png";

import { joinHuntSchema, newsletterUnsubscribeSchema } from "../../utils/schemas";

const twitchChannel = "playdarkwest";
const trailerEmbedUrl =
  "https://www.youtube.com/embed/9ZcosfeFLZE?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0";
const demoLaunchDate = new Date("2026-06-10T00:00:00-07:00");
const twitchLiveStatusUrl = `/twitch/live?channel=${encodeURIComponent(twitchChannel)}`;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readTwitchLiveStatus = (value: unknown): boolean => {
  if (!isObject(value)) {
    return false;
  }

  if (typeof value.isLive === "boolean") {
    return value.isLive;
  }

  if (typeof value.live === "boolean") {
    return value.live;
  }

  if (isObject(value.data)) {
    return readTwitchLiveStatus(value.data);
  }

  return false;
};

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
  const [isTwitchLoaded, setIsTwitchLoaded] = useState(false);
  const [isTwitchLive, setIsTwitchLive] = useState(false);
  const [countdownUnits, setCountdownUnits] = useState(getCountdownUnits);
  const currentDomain = window.location.hostname;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdownUnits(getCountdownUnits());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const checkTwitchStatus = async () => {
      try {
        const response = await fetch(resolveApiUrl(twitchLiveStatusUrl), {
          signal: controller.signal,
        });

        if (!response.ok) {
          setIsTwitchLive(false);
          return;
        }

        const payload = (await response.json()) as unknown;
        setIsTwitchLive(readTwitchLiveStatus(payload));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setIsTwitchLive(false);
      }
    };

    void checkTwitchStatus();

    return () => controller.abort();
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
        <S.MainTitle
          src={mainLogo}
          alt="The Dark West Logo"
          decoding="async"
        />

        <S.VideoWrapper>
          <iframe
            src={trailerEmbedUrl}
            title="The Dark West - Official Reveal Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
          />
        </S.VideoWrapper>

        <S.BottomActions>
          <S.ActionLink
            href="https://store.steampowered.com/app/3574750/The_Dark_West/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <S.ActionIcon
              src={steamLogo}
              alt="Steam"
              className="steam-icon"
              decoding="async"
            />
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
              decoding="async"
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
            <S.CountdownEyebrow>Demo releases June 10 PDT</S.CountdownEyebrow>

            <S.CountdownGrid>
              {countdownUnits.map((unit) => (
                <S.CountdownUnit key={unit.label} aria-label={unit.label}>
                  <S.CountdownValue>
                    {String(unit.value).padStart(2, "0")}
                  </S.CountdownValue>
                </S.CountdownUnit>
              ))}
            </S.CountdownGrid>

            <S.CountdownLabelGrid aria-hidden="true">
              {countdownUnits.map((unit) => (
                <S.CountdownLabel key={unit.label}>
                  {unit.label}
                </S.CountdownLabel>
              ))}
            </S.CountdownLabelGrid>
          </S.CountdownContent>
        </S.CountdownPanel>

        {isTwitchLive && isTwitchVisible && (
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

            <S.FloatingStreamWrapper>
              <S.IframeWrapper>
                {isTwitchLoaded ? (
                  <iframe
                    src={`https://player.twitch.tv/?channel=${twitchChannel}&parent=${currentDomain}&muted=true`}
                    allowFullScreen
                  />
                ) : (
                  <S.LoadStreamButton
                    type="button"
                    onClick={() => setIsTwitchLoaded(true)}
                  >
                    Load stream
                  </S.LoadStreamButton>
                )}
              </S.IframeWrapper>
            </S.FloatingStreamWrapper>
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
