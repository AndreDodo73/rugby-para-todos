import { useEffect, useRef, useState } from "react";
import { mediaUrl, textValue } from "../content/cmsCatalog";
import { useCms } from "../lib/CmsContext";
import { scrollToAnchor } from "../lib/scrollToAnchor";

/** Active hero clip. Alternate kept in public/media: hero-boy-tossing.mp4 + poster. */
const HERO_VIDEO = "/media/hero-rugby.mp4";
const HERO_POSTER = "/media/hero-rugby-poster.jpg";
/** Complete the clip sooner in the scroll so the scrub feels quicker. */
const SCROLL_SPAN_FACTOR = 0.52;

const heroCopy = {
  pt: {
    start: "Começa no Rugby.",
    beyond: "Vai muito além do campo.",
    description: "Promovemos cidadania, e criamos oportunidades por meio do esporte.",
    action: "Faça parte dessa transformação",
    scroll: "Deslize para conhecer o RPT",
  },
  en: {
    start: "It starts with Rugby.",
    beyond: "It goes far beyond the field.",
    description: "We promote citizenship and create opportunities through sport.",
    action: "Be part of this transformation",
    scroll: "Swipe to meet RPT",
  },
  fr: {
    start: "Tout commence avec le Rugby.",
    beyond: "Bien au-delà du terrain.",
    description: "Nous favorisons la citoyenneté et créons des opportunités grâce au sport.",
    action: "Participez à cette transformation",
    scroll: "Glissez pour découvrir le RPT",
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameReady, setFrameReady] = useState(false);
  const cms = useCms();
  const fallback = heroCopy[language];
  const text = {
    start: textValue(cms.texts, "hero.start", fallback.start),
    beyond: textValue(cms.texts, "hero.beyond", fallback.beyond),
    description: textValue(cms.texts, "hero.description", fallback.description),
    action: textValue(cms.texts, "hero.action", fallback.action),
    scroll: textValue(cms.texts, "hero.scroll", fallback.scroll),
  };
  const poster = mediaUrl(cms.media, "hero.poster", HERO_POSTER);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!video || !canvas || !section) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // iOS/Safari clears the <video> framebuffer while seeking → black flashes.
    // Paint decoded frames onto a canvas so the last good frame stays visible.
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const seekEpsilon = coarsePointer ? 0.05 : 0.012;
    let raf = 0;
    let desiredTime = 0;
    let seeking = false;
    let pending = false;
    let unlocked = false;

    const paint = () => {
      if (video.readyState < 2) return false;
      const width = video.videoWidth;
      const height = video.videoHeight;
      if (!width || !height) return false;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      ctx.drawImage(video, 0, 0, width, height);
      setFrameReady(true);
      return true;
    };

    const seekToDesired = () => {
      if (video.readyState < 1) return;
      if (seeking) {
        pending = true;
        return;
      }
      if (Math.abs(video.currentTime - desiredTime) < seekEpsilon) {
        paint();
        return;
      }
      seeking = true;
      pending = false;
      try {
        video.currentTime = desiredTime;
      } catch {
        seeking = false;
      }
    };

    const onSeeked = () => {
      seeking = false;
      paint();
      if (pending) seekToDesired();
    };

    const update = () => {
      raf = 0;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const span = Math.max(180, section.clientHeight * SCROLL_SPAN_FACTOR);
      const raw = Math.min(1, Math.max(0, window.scrollY / span));
      // Ease-out so early scroll advances the clip faster, then settles.
      const progress = 1 - (1 - raw) * (1 - raw);
      const lastFrame = Math.max(0, video.duration - 0.04);
      desiredTime = reducedMotion.matches ? 0 : progress * lastFrame;
      seekToDesired();
    };

    const scheduleUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const unlockDecoder = async () => {
      if (unlocked) return;
      unlocked = true;
      video.muted = true;
      try {
        await video.play();
        video.pause();
      } catch {
        // Autoplay may still be blocked; seeking + paint still works after data loads.
      }
      paint();
      scheduleUpdate();
    };

    const onReady = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      void unlockDecoder();
    };
    const onFail = () => setFrameReady(false);

    video.pause();
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("error", onFail);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    if (video.readyState >= 2) onReady();
    scheduleUpdate();

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("error", onFail);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return (
    <section className="hero" ref={sectionRef} id="conteudo" aria-labelledby="hero-title">
      <img
        className="hero-media"
        src={poster}
        alt=""
        aria-hidden="true"
        style={frameReady ? { opacity: 0 } : undefined}
      />
      {/* Off-DOM decoder source: Safari blacks this out mid-seek; canvas holds the frame. */}
      <video
        ref={videoRef}
        className="hero-media-source"
        src={HERO_VIDEO}
        poster={poster}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      />
      <canvas
        ref={canvasRef}
        className="hero-media"
        aria-hidden="true"
        style={frameReady ? undefined : { opacity: 0, pointerEvents: "none" }}
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
      <button
        type="button"
        className="scroll-cue"
        onClick={() => {
          scrollToAnchor("impacto");
        }}
        aria-label={text.scroll}
      >
        <span aria-hidden="true" />
        {text.scroll}
        <i className="scroll-cue-chevron" aria-hidden="true" />
      </button>
    </section>
  );
}
