import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../components/Photo";
import {
  about,
  awards,
  donations,
  hero,
  news,
  pages,
  photoAlts,
  pillars,
  projects,
  shop,
  stories,
  storyPhoto,
} from "../content/site";
import { ui } from "../content/ui";
import { localize, t, useLang } from "../locale";

export function HomePage() {
  const lang = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const featured = stories.find((story) => story.featured) ?? stories[0];

  useEffect(() => {
    const root = document.documentElement;
    const el = heroRef.current;
    if (!el || !root.classList.contains("js-hero")) return;
    let frame = 0;
    const update = () => {
      const box = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -box.top / (box.height * 0.7)));
      el.style.setProperty("--hero-p", progress.toFixed(3));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="hero-media">
          <Photo id={hero.photo} alt={t(hero.alt, lang)} priority className="hero-photo" />
        </div>
        <div className="hero-copy">
          <p className="kicker">Instituto Rugby Para Todos</p>
          <h1>
            <span className="line">{t(hero.titleA, lang)}</span>
            <span className="line accent">{t(hero.titleB, lang)}</span>
          </h1>
          <p className="lead">{t(hero.lead, lang)}</p>
          <div className="actions">
            <Link className="btn" to={localize(lang, pages.stories.path)}>
              {t(ui.storiesCta, lang)}
            </Link>
            <Link className="btn btn-ghost" to={localize(lang, pages.support.path)}>
              {t(ui.supportCta, lang)}
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="instituto">
        <div className="grid">
          <div className="span-6">
            <p className="kicker">{t(about.kicker, lang)}</p>
            <h2>{t(about.title, lang)}</h2>
            <p>{t(about.origin, lang)}</p>
            <p className="note">{t(about.reachNote, lang)}</p>
            <p className="fine">{t(ui.sourceLine, lang)}</p>
          </div>
          <ol className="pillars span-6">
            {pillars.map((pillar, index) => (
              <li key={pillar.title.pt}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{t(pillar.title, lang)}</h3>
                  <p>{t(pillar.text, lang)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-story" id="historias">
        <div className="grid story-head">
          <p className="kicker span-12">{t(pages.stories.nav, lang)}</p>
          <h2 className="span-8">{t(pages.stories.title, lang)}</h2>
          <p className="span-4 story-intro">{t(storiesIntro(), lang)}</p>
        </div>
        <div className="grid story-feature">
          <figure className="span-7 story-figure">
            <Photo id={storyPhoto.id} alt={t(storyPhoto.alt, lang)} className="fill-photo" />
            <figcaption>{t(ui.archiveCaption, lang)}</figcaption>
          </figure>
          <div className="span-5 story-sheet">
            <p className="kicker">01</p>
            <h3>{featured.name}</h3>
            <p className="note">{t(ui.pendingQuote, lang)}</p>
            <p className="note">{t(ui.pendingProject, lang)}</p>
            <Link className="text-link" to={localize(lang, `${pages.stories.path}/${featured.slug}`)}>
              {t(ui.readStory, lang)}
            </Link>
          </div>
        </div>
        <ol className="story-index">
          {stories
            .filter((story) => story.slug !== featured.slug)
            .map((story, index) => (
              <li key={story.slug}>
                <span>{String(index + 2).padStart(2, "0")}</span>
                <Link to={localize(lang, `${pages.stories.path}/${story.slug}`)}>{story.name}</Link>
                <em>{story.videoId ? t(ui.videoLabel, lang) : t(ui.pendingVideo, lang)}</em>
              </li>
            ))}
        </ol>
      </section>

      <section className="section" id="projetos">
        <div className="grid">
          <div className="span-7">
            <p className="kicker">{t(pages.projects.nav, lang)}</p>
            <h2>{t(pages.projects.title, lang)}</h2>
          </div>
          <p className="span-5">{t(projectIntro(), lang)}</p>
        </div>
        {projects.map((project, index) => (
          <article className={index % 2 ? "project-band is-flip" : "project-band"} key={project.slug}>
            <div className="project-media">
              <Photo id={project.photo} alt={t(photoAlts[project.photo], lang)} className="fill-photo" />
            </div>
            <div className="project-copy">
              <p className="kicker">
                {project.yearLabel} · {project.status}
              </p>
              <h3>{project.name}</h3>
              <p>{project.place ? t(project.place, lang) : t(ui.locationPending, lang)}</p>
              <p className="fine">
                {project.photoKnown ? t(ui.identifiedCaption, lang) : t(ui.territoryCaption, lang)}
              </p>
              <Link className="text-link" to={localize(lang, `${pages.projects.path}/${project.slug}`)}>
                {t(ui.projectLink, lang)}
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="section section-dark" id="loja">
        <div className="grid">
          <div className="span-7">
            <p className="kicker">Loja RPT</p>
            <h2>{t(pages.shop.title, lang)}</h2>
            <p>{t(shop.publishedLine, lang)}</p>
            <p className="note">{t(ui.shopDestination, lang)}</p>
          </div>
          <div className="span-5 shop-side">
            <p>{t(ui.shopEmpty, lang)}</p>
            <p className="fine">{t(ui.shopFields, lang)}</p>
            <p className="fine">{t(ui.noIntlShipping, lang)}</p>
            <a className="btn" href={shop.url} target="_blank" rel="noreferrer">
              {shop.platform}
              <span className="visually-hidden"> — {t(ui.opensNew, lang)}</span>
            </a>
            <Link className="text-link" to={localize(lang, pages.shop.path)}>
              {t(pages.shop.nav, lang)}
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-mist" id="apoio">
        <div className="grid">
          <div className="span-6">
            <p className="kicker">{t(pages.support.nav, lang)}</p>
            <h2>
              {lang === "pt"
                ? "Quem apoia também faz parte."
                : lang === "en"
                  ? "Whoever supports is part of it."
                  : "Qui soutient en fait aussi partie."}
            </h2>
            <p className="note">{t(ui.partnersPending, lang)}</p>
            <Link className="btn" to={localize(lang, pages.support.path)}>
              {t(ui.supportCta, lang)}
            </Link>
          </div>
          <div className="span-6">
            <p className="kicker">
              {lang === "pt" ? "Reconhecimento publicado" : lang === "en" ? "Published recognition" : "Reconnaissances publiées"}
            </p>
            <ul className="award-list">
              {awards.slice(0, 4).map((award) => (
                <li key={award.title}>
                  {award.href ? (
                    <a href={award.href} target="_blank" rel="noreferrer">
                      {award.title}
                    </a>
                  ) : (
                    award.title
                  )}
                </li>
              ))}
            </ul>
            <Link className="text-link" to={localize(lang, pages.about.path)}>
              {t(pages.about.nav, lang)}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid support-paths">
          <div className="span-4">
            <h2>{t(pages.support.title, lang)}</h2>
          </div>
          <div className="span-4">
            <h3>{lang === "pt" ? "Pessoa física" : lang === "en" ? "Individuals" : "Particuliers"}</h3>
            <ul className="plain-list">
              {donations.slice(0, 3).map((item) => (
                <li key={item.id}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {t(item.label, lang)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="span-4">
            <h3>{lang === "pt" ? "Empresas e serviços" : lang === "en" ? "Companies and services" : "Entreprises et services"}</h3>
            <p className="fine">{t(ui.externalChannel, lang)}</p>
            <Link className="text-link" to={localize(lang, pages.support.path)}>
              {t(pages.support.nav, lang)}
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-news">
        <div className="grid">
          <div className="span-4">
            <p className="kicker">{t(pages.news.nav, lang)}</p>
            <h2>{t(pages.news.title, lang)}</h2>
            <p className="fine">{t(ui.newsEmptyDate, lang)}</p>
          </div>
          <ul className="span-8 news-list">
            {news.map((item) => (
              <li key={item.slug}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function storiesIntro() {
  return {
    pt: "A home atual lista nomes e alguns vídeos. Não publica o texto de um depoimento.",
    en: "The current home page lists names and some videos. It does not publish a written testimony.",
    fr: "L’accueil actuel liste des noms et quelques vidéos. Il ne publie pas de témoignage écrit.",
  };
}

function projectIntro() {
  return {
    pt: "Cada card do site atual traz nome, ano de contagem e o status “Em captação”. A descrição longa de cada território não está na home.",
    en: "Each card on the current site shows a name, a year count and the status “Em captação”. A long description of each territory is not on the home page.",
    fr: "Chaque fiche du site actuel indique un nom, un décompte d’années et le statut « Em captação ». La longue description de chaque territoire n’est pas sur l’accueil.",
  };
}
