import { useState, type ReactNode } from "react";
import { documents, institutional, official, type SiteLanguage } from "../content/institutional";
import "./InstitutionalSections.css";

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
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const plainLabel = typeof children === "string" || typeof children === "number";
  const hideIcon = className.includes("social-channel");
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {plainLabel ? <span className="link-label">{children}</span> : children}
      {hideIcon ? null : <ExtIcon />}
    </a>
  );
}

export function VideoStories({ language }: { language: SiteLanguage }) {
  const t = institutional[language];
  return (
    <section className="video-stories" aria-labelledby="video-stories-title">
      <img src="/assets/rpt-em-movimento.jpg" alt="" loading="lazy" />
      <div className="video-stories-copy reveal">
        <p className="eyebrow light">{t.contentEyebrow}</p>
        <h2 id="video-stories-title">{t.videoTitle}</h2>
        <Outbound className="pill light-pill" href={official.social[1].href}>
          {t.videoCta}
        </Outbound>
      </div>
    </section>
  );
}

export function MethodologySection({ language }: { language: SiteLanguage }) {
  const t = institutional[language];
  return (
    <section className="methodology restored-section" id="metodologia">
      <div className="methodology-awards reveal">
        <img src="/assets/premios.jpg" alt={t.awards} loading="lazy" />
        <p className="eyebrow">{t.awards}</p>
        <h3>{t.awardsSubtitle}</h3>
        <ol className="award-list">
          {t.awardNames.map((award, i) => (
            <li key={award}>
              <span>{["2006 / 08", "2012", "2013", "2017"][i]}</span>
              <p>{award}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="methodology-copy reveal">
        <p className="eyebrow">{t.methodEyebrow}</p>
        <h2>{t.methodTitle}</h2>
        <p>{t.methodBody}</p>
        <div className="method-values">
          {t.methodValues.map((value, i) => (
            <span key={value}>
              <small>0{i + 1}</small>
              {value}
            </span>
          ))}
        </div>
        <p>{t.methodTeam}</p>
      </div>
    </section>
  );
}

export function ServicesSection({ language }: { language: SiteLanguage }) {
  const t = institutional[language];
  return (
    <section className="services restored-section" id="servicos" aria-labelledby="services-title">
      <div className="section-intro reveal">
        <div>
          <p className="eyebrow">{t.serviceEyebrow}</p>
          <h2 id="services-title">{t.serviceTitle}</h2>
        </div>
        <p>{t.serviceBody}</p>
      </div>
      <div className="service-grid">
        {t.serviceTitles.map((title, i) => (
          <article className="service-card reveal" key={title}>
            <div className="service-image">
              <img
                src={`/assets/${["54817.png", "e9a3a.png", "46562.png"][i]}`}
                alt={title}
                loading="lazy"
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
  return (
    <section className="governance restored-section" id="transparencia">
      <div className="section-intro reveal">
        <div>
          <p className="eyebrow">{t.governanceEyebrow}</p>
          <h2>{t.governanceTitle}</h2>
        </div>
        <p>{t.governanceBody}</p>
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
  const [amount, setAmount] = useState<keyof typeof official.donations>("100");
  const t = institutional[language];
  const isMonthly = frequency === "monthly";
  return (
    <section className="support-options restored-section" id="formas-de-apoiar">
      <div className="support-options-grid">
        <div className="support-copy reveal">
          <p className="eyebrow">{t.supportEyebrow}</p>
          <h2>{t.supportTitle}</h2>
          <p>{t.supportBody}</p>
        </div>
        <div className="donation-panel reveal">
          <p className="donation-kicker">{t.supportEyebrow}</p>
          <p className="donation-heading">{isMonthly ? t.monthly : t.once}</p>
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
              <p className="donation-amount-label">{t.chooseAmount}</p>
              <div className="donation-amounts" role="group" aria-label={t.chooseAmount}>
                {(["50", "100", "200", "other"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value)}
                    aria-pressed={amount === value}
                  >
                    {value === "other" ? t.other : `R$ ${value}`}
                  </button>
                ))}
              </div>
            </>
          )}
          <Outbound
            className="pill donation-submit"
            href={isMonthly ? official.monthly : official.donations[amount]}
          >
            {isMonthly ? t.giveMonthly : t.give}
          </Outbound>
          <p className="donation-channel">
            {isMonthly ? t.channelMonthly : t.channelOnce}
          </p>
          <p className="external-note">{t.externalPayment}</p>
        </div>
      </div>
      <div className="support-other reveal">
        <article className="support-path">
          <p className="eyebrow">Loja RPT</p>
          <h3>{t.shopTitle}</h3>
          <p>{t.shopBody}</p>
          <Outbound className="pill support-path-cta" href={official.shop}>
            {t.shopCta}
          </Outbound>
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
          <img src="/assets/fb2b9.png" alt={t.archive} loading="lazy" />
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
