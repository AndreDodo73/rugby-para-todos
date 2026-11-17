import { useEffect, useRef, useState } from "react";

const HERO_VIDEO = "/media/hero-rugby.mp4";
const HERO_POSTER = "/media/hero-rugby-poster.jpg";

const heroCopy = {
  pt: {
    start: "Começa no Rugby.",
    beyond: "Vai muito além do campo.",
    description: "Promovemos cidadania, e criamos oportunidades por meio do esporte.",
    action: "Faça parte dessa transformação",
  },
  en: {
    start: "It starts with Rugby.",
    beyond: "It goes far beyond the field.",
    description: "We promote citizenship and create opportunities through sport.",
    action: "Be part of this transformation",
  },
  fr: {
    start: "Tout commence avec le Rugby.",
    beyond: "Bien au-delà du terrain.",
    description: "Nous favorisons la citoyenneté et créons des opportunités grâce au sport.",
    action: "Participez à cette transformation",
  },
};

export function Hero({
  language,
  onJoin,
}: {
  language: keyof typeof heroCopy;
  onJoin: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const text = heroCopy[language];

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let desiredTime = 0;

    // Keep the decoder paused: scrolling selects frames, never starts playback.
    const seek = () => {
      if (video.readyState < 1 || video.seeking) return;
      if (Math.abs(video.currentTime - desiredTime) > 1 / 48) {
        video.currentTime = desiredTime;
      }
    };
    const update = () => {
      frame = 0;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / section.clientHeight));
      const lastFrame = Math.max(0, video.duration - 1 / 24);
      desiredTime = reducedMotion.matches ? 0 : Math.round(progress * lastFrame * 24) / 24;
      seek();
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMeta = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setVideoReady(true);
        scheduleUpdate();
      }
    };
    const onFail = () => setVideoReady(false);

    video.pause();
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("error", onFail);
    video.addEventListener("seeked", seek);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    scheduleUpdate();

    return () => {
      cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("error", onFail);
      video.removeEventListener("seeked", seek);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return (
    <section className="hero" ref={sectionRef} id="conteudo" aria-labelledby="hero-title">
      {/* Still matches Make frame 0 until hero-rugby.mp4 is exported. */}
      <img
        className="hero-media"
        src={HERO_POSTER}
        alt=""
        aria-hidden="true"
        style={videoReady ? { opacity: 0 } : undefined}
      />
      <video
        ref={videoRef}
        className="hero-media"
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-hidden="true"
        style={videoReady ? undefined : { opacity: 0, pointerEvents: "none" }}
      />
      <div className="hero-gradient hero-gradient-left" aria-hidden="true" />
      <div className="hero-gradient hero-gradient-right" aria-hidden="true" />
      <div className="hero-content" lang={language}>
        <h1 id="hero-title">
          <span>{text.start}</span>
          <span className="hero-title-accent">{text.beyond}</span>
        </h1>
        <p className="hero-description">{text.description}</p>
        <button className="hero-cta" onClick={onJoin}>
          {text.action}
        </button>
      </div>
    </section>
  );
}
