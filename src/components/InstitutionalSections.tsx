import { useEffect, useRef, useState, type ReactNode } from "react";
import { mediaUrl, textValue } from "../content/cmsCatalog";
import {
  apparelSizes,
  awardsList,
  documents,
  institutional,
  official,
  formatShopPrice,
  shopProducts,
  shopWhatsAppHref,
  type SiteLanguage,
} from "../content/institutional";
import { useCms } from "../lib/CmsContext";
import "./InstitutionalSections.css";

const PRESET_DONATION_AMOUNTS = ["50", "100", "200"] as const;
type PresetDonationAmount = (typeof PRESET_DONATION_AMOUNTS)[number];
/** Preset chips or any custom whole-reais amount chosen in the modal. */
type DonationAmount = PresetDonationAmount | string;

const MIN_CUSTOM_DONATION = 50;
const MAX_CUSTOM_DONATION = 100_000;
const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Primeira foto = a já escolhida no site novo; demais só para o ciclo. */
const SERVICE_GALLERIES = [
  [
    "/assets/clinica-rugby.jpg",
    "/assets/services/clinica/01.jpg",
    "/assets/services/clinica/02.jpg",
    "/assets/services/clinica/03.jpg",
    "/assets/services/clinica/04.png",
    "/assets/services/clinica/05.jpg",
    "/assets/services/clinica/06.jpg",
  ],
  [
    "/assets/e9a3a.png",
    "/assets/services/team-building/01.jpg",
    "/assets/services/team-building/02.png",
    "/assets/services/team-building/03.png",
    "/assets/services/team-building/04.png",
    "/assets/services/team-building/05.jpg",
    "/assets/services/team-building/06.jpg",
  ],
  [
    "/assets/46562.png",
    "/assets/services/intercambio/01.jpg",
    "/assets/services/intercambio/02.jpg",
    "/assets/services/intercambio/03.jpg",
    "/assets/services/intercambio/04.jpg",
    "/assets/services/intercambio/05.jpg",
    "/assets/services/intercambio/06.jpg",
  ],
] as const;

function ServiceImageCycle({
  images,
  alt,
  staggerMs = 0,
}: {
  images: readonly string[];
  alt: string;
  staggerMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (images.length < 2 || paused || reduceMotion) return;
    let intervalId = 0;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIndex((current) => {
          setPrev(current);
          return (current + 1) % images.length;
        });
      }, 4200);
    }, staggerMs);
    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [images.length, paused, reduceMotion, staggerMs]);

  useEffect(() => {
    if (prev == null) return;
    const id = window.setTimeout(() => setPrev(null), 900);
    return () => window.clearTimeout(id);
  }, [prev, index]);

  return (
    <div
      className="service-cycle"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {images.map((src, i) => {
        const state = i === index ? "is-active" : i === prev ? "is-exit" : "is-wait";
        return (
          <img
            key={src}
            src={src}
            alt={i === index ? alt : ""}
            aria-hidden={i === index ? undefined : true}
            loading={i === 0 ? "eager" : "lazy"}
            className={state}
          />
        );
      })}
    </div>
  );
}

function formatDonationAmount(value: string, language: SiteLanguage) {
  const locale = language === "en" ? "en-US" : language === "fr" ? "fr-FR" : "pt-BR";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatDonationDigits(value: string, language: SiteLanguage) {
  const locale = language === "en" ? "en-US" : language === "fr" ? "fr-FR" : "pt-BR";
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Number(digits));
}

function parseDonationDigits(raw: string) {
  return raw.replace(/\D/g, "");
}

function donationHref(amount: DonationAmount) {
  if (amount === "50" || amount === "100" || amount === "200") {
    return official.donations[amount];
  }
  const url = new URL(official.donations.other);
  url.searchParams.set("amount", amount);
  url.searchParams.set("currency_code", "BRL");
  return url.toString();
}

function isPresetDonationAmount(amount: DonationAmount): amount is PresetDonationAmount {
  return (PRESET_DONATION_AMOUNTS as readonly string[]).includes(amount);
}

function isSuggestedOtherAmount(amount: string) {
  return (official.otherDonationAmounts as readonly string[]).includes(amount);
}

function validateCustomDonation(digits: string, language: SiteLanguage) {
  const t = institutional[language];
  if (!digits) {
    return { ok: false as const, message: t.otherAmountErrorInvalid };
  }
  const value = Number(digits);
  if (!Number.isFinite(value) || value <= 0) {
    return { ok: false as const, message: t.otherAmountErrorInvalid };
  }
  if (value < MIN_CUSTOM_DONATION) {
    return { ok: false as const, message: t.otherAmountErrorMin };
  }
  if (value > MAX_CUSTOM_DONATION) {
    return {
      ok: false as const,
      message:
        language === "en"
          ? `The maximum amount is ${formatDonationAmount(String(MAX_CUSTOM_DONATION), language)}.`
          : language === "fr"
            ? `Le montant maximum est de ${formatDonationAmount(String(MAX_CUSTOM_DONATION), language)}.`
            : `O valor máximo é ${formatDonationAmount(String(MAX_CUSTOM_DONATION), language)}.`,
    };
  }
  return { ok: true as const, value: String(value) };
}

function ExtIcon() {
  // Make/Figma: seta linha limpa ↗ (sem quadrado)
  return (
    <span className="arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
        <path
          d="M7 17 17 7M9 7h8v8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Outbound({
  href,
  children,
  className = "text-link",
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const plainLabel = typeof children === "string" || typeof children === "number";
  const hideIcon = className.includes("social-channel");
  const accessibleName = plainLabel ? String(children) : undefined;
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleName ? `${accessibleName} (abre em nova aba)` : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {plainLabel ? <span className="link-label">{children}</span> : children}
      {hideIcon ? null : <ExtIcon />}
    </a>
  );
}

export function VideoStories({ language }: { language: SiteLanguage }) {
  const t = institutional[language];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const playPromise = video.play();
    if (playPromise) {
      playPromise
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  };

  return (
    <section
      className={`video-stories${playing ? " is-playing" : ""}`}
      aria-labelledby="video-stories-title"
    >
      <video
        ref={videoRef}
        className="video-stories-media"
        src="/assets/boy-running-rugby.mp4"
        poster="/assets/boy-running-rugby-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="video-stories-copy reveal">
        <p className="eyebrow light">{t.contentEyebrow}</p>
        <h2 id="video-stories-title">{t.videoTitle}</h2>
        <Outbound
          className="pill light-pill"
          href={official.social[1].href}
          onMouseEnter={playVideo}
          onMouseLeave={stopVideo}
          onFocus={playVideo}
          onBlur={stopVideo}
        >
          {t.videoCta}
        </Outbound>
      </div>
    </section>
  );
}

export function MethodologySection({ language }: { language: SiteLanguage }) {
  const t = institutional[language];
  const cms = useCms();
  const methodTitle = textValue(cms.texts, "method.title", t.methodTitle);
  const methodBody = textValue(cms.texts, "method.body", t.methodBody);
  return (
    <section className="methodology restored-section" id="metodologia">
      <div className="methodology-head reveal">
        <p className="eyebrow">{t.methodEyebrow}</p>
        <h2>
          {methodTitle.split(". ").map((part, index, parts) => (
            <span key={part}>
              {part}
              {index < parts.length - 1 ? "." : ""}
              {index < parts.length - 1 ? <br /> : null}
            </span>
          ))}
        </h2>
        <div className="methodology-lead">
          <p>{methodBody}</p>
          <p className="methodology-team">{t.methodTeam}</p>
        </div>
      </div>

      <ol className="method-values reveal" aria-label={methodTitle}>
        {t.methodValues.map((value, i) => (
          <li key={value}>
            <span className="method-value-index">0{i + 1}</span>
            <span className="method-value-label">{value}</span>
          </li>
        ))}
      </ol>

      <div className="awards-band reveal">
        <div className="awards-gallery">
          <img
            className="awards-shot awards-shot-ceremony"
            src="/assets/awards/ceremony.jpg"
            alt="Entrega de premiação do Instituto Rugby Para Todos"
            loading="lazy"
          />
          <img
            className="awards-shot awards-shot-trophy"
            src="/assets/awards/trophy.jpg"
            alt="Jovens atletas erguem o troféu"
            loading="lazy"
          />
          <img
            className="awards-shot awards-shot-match"
            src="/assets/awards/match.jpg"
            alt="Crianças em jogo de rugby"
            loading="lazy"
          />
        </div>
        <div className="awards-copy">
          <p className="eyebrow">{t.awards}</p>
          <h3>{t.awardsSubtitle}</h3>
          <div className="award-list">
            {awardsList.map((award) => (
              <Outbound className="award-link" href={award.href} key={award.title}>
                <span className="award-year">{award.year}</span>
                <span className="award-body">
                  <span className="award-title">{award.title}</span>
                  <small className="award-credit">{award.credit}</small>
                </span>
              </Outbound>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ShopSection({ language }: { language: SiteLanguage }) {
  const t = institutional[language];
  const cms = useCms();
  const railRef = useRef<HTMLDivElement>(null);
  const [sizeByProduct, setSizeByProduct] = useState<Record<string, string>>(() =>
    Object.fromEntries(shopProducts.filter((product) => product.apparel).map((product) => [product.id, "M"])),
  );
  const [colorByProduct, setColorByProduct] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      shopProducts
        .filter((product) => product.colors)
        .map((product) => [product.id, product.colors?.[0].id ?? ""]),
    ),
  );
  const sectionTitle = textValue(cms.texts, "shop.sectionTitle", t.shopSectionTitle);
  const sectionBody = textValue(cms.texts, "shop.sectionBody", t.shopSectionBody);
  const priceByProduct = Object.fromEntries(
    cms.shop
      .filter((row) => row.priceCents != null)
      .map((row) => [row.id, row.priceCents as number]),
  );
  const imageByProduct = Object.fromEntries(
    cms.shop.filter((row) => row.image).map((row) => [row.id, row.image as string]),
  );
  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".shop-card");
    const distance = (card?.offsetWidth ?? 300) + 18;
    rail.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };
  return (
    <section className="shop restored-section" id="loja" aria-labelledby="shop-title">
      <div className="section-intro reveal">
        <div>
          <p className="eyebrow">{t.shopEyebrow}</p>
          <h2 id="shop-title">{sectionTitle}</h2>
        </div>
        <p>{sectionBody}</p>
      </div>
      <div className="shop-rail-wrap">
        <button
          type="button"
          className="stories-nav project-nav"
          onClick={() => scrollRail(-1)}
          aria-label={t.shopPrev}
        >
          ‹
        </button>
        <div className="shop-rail" ref={railRef}>
          {shopProducts.map((product) => {
            const name = textValue(
              cms.texts,
              `shop.product.${product.id}.name`,
              product.name[language],
            );
            const blurb = textValue(
              cms.texts,
              `shop.product.${product.id}.blurb`,
              product.blurb[language],
            );
            const size = product.apparel ? sizeByProduct[product.id] ?? "M" : undefined;
            const palette = product.colors;
            const selectedColor = palette?.find((option) => option.id === colorByProduct[product.id]) ?? palette?.[0];
            const fallbackImage = selectedColor?.image ?? product.image;
            const image =
              imageByProduct[product.id] ||
              mediaUrl(cms.media, `shop.${product.id}.image`, `/assets/${fallbackImage}`);
            // Only show a price when the database has a confirmed value.
            const priceCents = priceByProduct[product.id];
            const price = priceCents == null ? undefined : formatShopPrice(priceCents, language);
            return (
              <article className="shop-card reveal reveal-x" key={product.id}>
                <div className="shop-card-media">
                  <img
                    src={image.startsWith("http") || image.startsWith("/") ? image : `/assets/${image}`}
                    alt={name}
                    loading="lazy"
                  />
                </div>
                <div className="shop-card-copy">
                  <h3>{name}</h3>
                  <p className="shop-card-blurb">{blurb}</p>
                  <div className="shop-price">
                    <p className="shop-price-kicker">{t.shopPriceLabel}</p>
                    <p className="shop-card-price">{price ?? t.shopPriceNote}</p>
                    <p className="shop-card-shipping">{t.shopShipping}</p>
                  </div>
                  {product.apparel ? (
                    <div className="shop-sizes" role="group" aria-label={`${t.shopSizeLabel} ${name}`}>
                      {apparelSizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={size === option}
                          onClick={() =>
                            setSizeByProduct((current) => ({ ...current, [product.id]: option }))
                          }
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : palette && selectedColor ? (
                    <div className="shop-sizes" role="group" aria-label={`${t.shopColor} ${name}`}>
                      {palette.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={selectedColor.id === option.id}
                          onClick={() =>
                            setColorByProduct((current) => ({ ...current, [product.id]: option.id }))
                          }
                        >
                          <i className={`shop-swatch shop-swatch-${option.id}`} aria-hidden="true" />
                          {option.label[language]}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="shop-one-size">{t.shopOneSize}</p>
                  )}
                  <Outbound
                    className="shop-card-cta"
                    href={shopWhatsAppHref(name, language, {
                      size,
                      color: selectedColor?.label[language],
                    })}
                  >
                    {t.shopCardCta}
                  </Outbound>
                </div>
              </article>
            );
          })}
        </div>
        <button
          type="button"
          className="stories-nav stories-nav-next project-nav"
          onClick={() => scrollRail(1)}
          aria-label={t.shopNext}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export function ServicesSection({ language }: { language: SiteLanguage }) {
  const t = institutional[language];
  const cms = useCms();
  const serviceTitle = textValue(cms.texts, "service.title", t.serviceTitle);
  const serviceBody = textValue(cms.texts, "service.body", t.serviceBody);
  return (
    <section className="services restored-section" id="servicos" aria-labelledby="services-title">
      <div className="section-intro reveal">
        <div>
          <p className="eyebrow">{t.serviceEyebrow}</p>
          <h2 id="services-title">{serviceTitle}</h2>
        </div>
        <p>{serviceBody}</p>
      </div>
      <div className="service-grid">
        {t.serviceTitles.map((title, i) => (
          <article className="service-card reveal reveal-x" key={title}>
            <div className="service-image">
              <ServiceImageCycle
                images={SERVICE_GALLERIES[i] ?? SERVICE_GALLERIES[0]}
                alt={title}
                staggerMs={i * 900}
              />
              <span>0{i + 1}</span>
            </div>
            <div className="service-copy">
              <h3>{title}</h3>
              <p>{t.serviceDescriptions[i]}</p>
              <details>
                <summary>
                  {t.learnMore}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{t.serviceDetails[i]}</p>
              </details>
              <a
                className="text-link"
                href={`mailto:rugbyparatodos@rugbyparatodos.org.br?subject=${encodeURIComponent(`${t.serviceTitle} ${title}`)}`}
              >
                <span className="link-label">{t.contactService}</span>
                <ExtIcon />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GovernanceSection({ language }: { language: SiteLanguage }) {
  const t = institutional[language];
  const cms = useCms();
  const governanceTitle = textValue(cms.texts, "governance.title", t.governanceTitle);
  const governanceBody = textValue(cms.texts, "governance.body", t.governanceBody);
  return (
    <section className="governance restored-section" id="transparencia">
      <div className="section-intro reveal">
        <div>
          <p className="eyebrow">{t.governanceEyebrow}</p>
          <h2>{governanceTitle}</h2>
        </div>
        <p>{governanceBody}</p>
      </div>
      <div className="governance-grid">
        <div className="governance-copy reveal">
          <h3>{t.management}</h3>
          <p>{t.managementBody}</p>
          <div className="ombudsman">
            <p className="eyebrow">{t.ombudsman}</p>
            <p>{t.ombudsmanBody}</p>
            <a href="mailto:ouvidoria@rugbyparatodos.org.br">
              ouvidoria@rugbyparatodos.org.br
              <ExtIcon />
            </a>
          </div>
        </div>
        <div className="document-list reveal">
          {documents.map((document, i) => (
            <Outbound
              key={document.file}
              className="document-link"
              href={`${official.home}auxiliares/modulos/conteudo/pdf/${document.file}`}
            >
              <span className="document-index">{`0${i + 1}`}</span>
              <span className="document-title">
                {t.documentLabels[i]}
                <small>PDF · {document.year} · PT-BR</small>
              </span>
            </Outbound>
          ))}
          <p className="external-note">{t.externalNote}</p>
        </div>
      </div>
    </section>
  );
}

export function SupportSection({ language }: { language: SiteLanguage }) {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<DonationAmount>("100");
  const [otherPickerOpen, setOtherPickerOpen] = useState(false);
  const [draftDigits, setDraftDigits] = useState("");
  const [customTouched, setCustomTouched] = useState(false);
  const otherRailRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const otherTriggerRef = useRef<HTMLButtonElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);
  const t = institutional[language];
  const cms = useCms();
  const supportTitle = textValue(cms.texts, "support.title", t.supportTitle);
  const supportBody = textValue(cms.texts, "support.body", t.supportBody);
  const isMonthly = frequency === "monthly";
  const otherSelected = !isPresetDonationAmount(amount);
  const draftValidation = validateCustomDonation(draftDigits, language);
  const showDraftError = customTouched && !draftValidation.ok;
  const draftPreview = draftDigits
    ? formatDonationAmount(draftDigits, language)
    : t.otherAmountEmpty;

  useEffect(() => {
    if (!otherPickerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const frame = window.requestAnimationFrame(() => {
      customInputRef.current?.focus();
      const rail = otherRailRef.current;
      const active = rail?.querySelector<HTMLElement>('[aria-pressed="true"]');
      active?.scrollIntoView({ inline: "center", block: "nearest", behavior: "auto" });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOtherPickerOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusables = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true",
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(frame);
      previouslyFocused?.focus?.();
      if (document.activeElement === document.body) {
        otherTriggerRef.current?.focus();
      }
    };
  }, [otherPickerOpen]);

  const openOtherPicker = () => {
    // Só pré-preenche se já tinha escolhido “outro”; senão começa vazio até clicar/digitar.
    setDraftDigits(otherSelected ? parseDonationDigits(amount) : "");
    setCustomTouched(false);
    setOtherPickerOpen(true);
  };

  const selectSuggestedAmount = (value: string) => {
    setDraftDigits(value);
    setCustomTouched(false);
  };

  const onCustomInputChange = (raw: string) => {
    setDraftDigits(parseDonationDigits(raw));
    setCustomTouched(true);
  };

  const confirmOtherAmount = () => {
    setCustomTouched(true);
    const result = validateCustomDonation(draftDigits, language);
    if (!result.ok) {
      customInputRef.current?.focus();
      return;
    }
    setAmount(result.value);
    setOtherPickerOpen(false);
  };

  return (
    <section className="support-options restored-section" id="doe">
      <div className="donation-panel donation-panel-unified reveal">
        <div className="donation-intro">
          <p className="eyebrow">{t.supportEyebrow}</p>
          <h2>{supportTitle}</h2>
          <p className="donation-lead">{supportBody}</p>
        </div>
        <div className="donation-controls">
          <div className="donation-primary">
            <div className="donation-frequency" role="group" aria-label={t.supportEyebrow}>
              <button type="button" onClick={() => setFrequency("once")} aria-pressed={!isMonthly}>
                {t.once}
              </button>
              <button type="button" onClick={() => setFrequency("monthly")} aria-pressed={isMonthly}>
                {t.monthly}
              </button>
            </div>
            {isMonthly ? (
              <p className="monthly-description">{t.monthlyBody}</p>
            ) : (
              <>
                <p className="donation-amount-label" id="donation-amount-label">
                  {t.chooseAmount}
                </p>
                <div
                  className="donation-amounts"
                  role="group"
                  aria-labelledby="donation-amount-label"
                >
                  {PRESET_DONATION_AMOUNTS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(value)}
                      aria-pressed={amount === value}
                    >
                      {formatDonationAmount(value, language)}
                    </button>
                  ))}
                  <button
                    ref={otherTriggerRef}
                    type="button"
                    onClick={openOtherPicker}
                    aria-pressed={otherSelected}
                    aria-haspopup="dialog"
                    aria-expanded={otherPickerOpen}
                  >
                    {otherSelected ? formatDonationAmount(amount, language) : t.other}
                  </button>
                </div>
              </>
            )}
            <Outbound
              className="pill donation-submit"
              href={isMonthly ? official.monthly : donationHref(amount)}
            >
              {isMonthly ? t.giveMonthly : t.give}
            </Outbound>
            <p className="donation-channel">
              {isMonthly ? t.channelMonthly : t.channelOnce}
            </p>
          </div>
          <div className="donation-secondary">
            <p className="donation-secondary-label">{t.otherWays}</p>
            <div className="donation-alt-paths" role="group" aria-label={t.otherWays}>
              <Outbound className="pill donation-alt donation-alt-ir" href={official.incomeTax}>
                {t.incomeTax}
              </Outbound>
              <Outbound className="pill donation-alt" href={official.helpAsYouCan}>
                {t.helpAsYouCan}
              </Outbound>
            </div>
            <p className="donation-channel donation-alt-note">{t.incomeTaxNote}</p>
          </div>
          <p className="external-note">{t.externalPayment}</p>
        </div>
      </div>

      {otherPickerOpen ? (
        <div
          className="donation-other-modal"
          role="presentation"
          onClick={(event) => {
            // Só fecha no backdrop — evita fechar se o clique “vaza” do diálogo.
            if (event.target === event.currentTarget) setOtherPickerOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            className="donation-other-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="donation-other-title"
            aria-describedby="donation-other-hint"
          >
            <div className="donation-other-dialog-head">
              <div>
                <p className="eyebrow">{t.other}</p>
                <h3 id="donation-other-title">{t.otherAmountTitle}</h3>
              </div>
              <button
                type="button"
                className="donation-other-close"
                onClick={() => setOtherPickerOpen(false)}
                aria-label={t.otherAmountClose}
              >
                {t.otherAmountClose}
              </button>
            </div>
            <p className="donation-other-hint" id="donation-other-hint">
              {t.otherAmountHint}
            </p>
            <p className="donation-other-rail-label" id="donation-other-suggestions">
              {t.otherAmountSuggestions}
            </p>
            <div
              className="donation-other-rail"
              ref={otherRailRef}
              role="listbox"
              aria-labelledby="donation-other-suggestions"
            >
              {official.otherDonationAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  role="option"
                  className="donation-other-chip"
                  aria-selected={isSuggestedOtherAmount(draftDigits) && draftDigits === value}
                  aria-pressed={isSuggestedOtherAmount(draftDigits) && draftDigits === value}
                  onClick={() => selectSuggestedAmount(value)}
                >
                  {formatDonationAmount(value, language)}
                </button>
              ))}
            </div>
            <div className="donation-other-custom">
              <label className="donation-other-custom-label" htmlFor="donation-other-input">
                {t.otherAmountCustomLabel}
              </label>
              <div
                className={`donation-other-input-wrap${showDraftError ? " is-invalid" : ""}`}
              >
                <span className="donation-other-input-prefix" aria-hidden="true">
                  {t.otherAmountCustomPrefix}
                </span>
                <input
                  ref={customInputRef}
                  id="donation-other-input"
                  className="donation-other-input"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  enterKeyHint="done"
                  placeholder={t.otherAmountPlaceholder}
                  value={formatDonationDigits(draftDigits, language)}
                  aria-invalid={showDraftError}
                  aria-describedby={
                    showDraftError ? "donation-other-error donation-other-hint" : "donation-other-hint"
                  }
                  onChange={(event) => onCustomInputChange(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      confirmOtherAmount();
                    }
                  }}
                />
              </div>
              {showDraftError ? (
                <p className="donation-other-error" id="donation-other-error" role="alert">
                  {draftValidation.message}
                </p>
              ) : null}
            </div>
            <p
              className={`donation-other-preview${draftDigits ? "" : " is-empty"}`}
              aria-live="polite"
            >
              {draftPreview}
            </p>
            <button
              type="button"
              className="pill donation-other-confirm"
              onClick={confirmOtherAmount}
              disabled={!draftValidation.ok}
              aria-disabled={!draftValidation.ok}
            >
              {t.otherAmountConfirm}
            </button>
          </div>
        </div>
      ) : null}
      <div className="support-other reveal">
        <article className="support-path">
          <p className="eyebrow">Loja RPT</p>
          <h3>{t.shopTitle}</h3>
          <p>{t.shopBody}</p>
          <a className="pill support-path-cta" href="#loja">
            <span className="link-label">{t.shopCta}</span>
            <ExtIcon />
          </a>
        </article>
        <article className="support-path">
          <p className="eyebrow">Instituto RPT</p>
          <h3>{t.work}</h3>
          <p>{t.workBody}</p>
          <a
            className="pill support-path-cta"
            href="mailto:rugbyparatodos@rugbyparatodos.org.br?subject=Trabalhe%20conosco"
          >
            <span className="link-label">{t.workCta}</span>
            <ExtIcon />
          </a>
        </article>
      </div>
    </section>
  );
}

export function ContentSection({ language }: { language: SiteLanguage }) {
  const t = institutional[language];
  return (
    <section className="content-section restored-section" id="conteudos">
      <div className="section-intro reveal">
        <div>
          <p className="eyebrow">{t.contentEyebrow}</p>
          <h2>{t.contentTitle}</h2>
        </div>
        <p>{t.contentBody}</p>
      </div>
      <div className="content-editorial">
        <div className="content-image reveal reveal-image">
          <img
            src="/assets/054c1.png"
            alt={t.contentPhotoAlt}
            loading="lazy"
          />
          <span>{t.archive}</span>
        </div>
        <div className="content-news reveal">
          <p className="eyebrow">{t.newsTitle}</p>
          {t.news.map((headline, i) => (
            <Outbound
              key={headline}
              href={`${official.home}conteudo.php?idc=8&idcd=${i === 0 ? "488" : "494"}`}
              className="news-link"
            >
              <h3>{headline}</h3>
            </Outbound>
          ))}
        </div>
      </div>
      <div className="content-connect">
        <div className="newsletter-card reveal">
          <p className="eyebrow">Newsletter</p>
          <h3>{t.newsletterTitle}</h3>
          <p>{t.newsletterBody}</p>
          <Outbound className="pill dark-pill" href={official.newsletter}>
            {t.newsletterCta}
          </Outbound>
        </div>
        <div className="social-card reveal">
          <p className="eyebrow">{t.socialTitle}</p>
          <div className="content-socials">
            {official.social.map((social) => (
              <Outbound href={social.href} className="social-channel" key={social.name}>
                <img src={`/assets/${social.icon}`} alt="" />
                <span>{social.name}</span>
              </Outbound>
            ))}
          </div>
          <p className="external-note">{t.externalNote}</p>
        </div>
      </div>
    </section>
  );
}
