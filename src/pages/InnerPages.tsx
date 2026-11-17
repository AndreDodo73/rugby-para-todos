import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { Photo } from "../components/Photo";
import { VideoGate } from "../components/VideoGate";
import {
  about,
  awards,
  contacts,
  documents,
  donations,
  extraForms,
  governance,
  news,
  pages,
  photoAlts,
  projects,
  services,
  shop,
  stories,
} from "../content/site";
import { ui } from "../content/ui";
import { localize, t, useLang } from "../locale";

export function AboutPage() {
  const lang = useLang();
  return (
    <article className="page">
      <header className="page-intro grid">
        <p className="kicker span-12">{t(about.kicker, lang)}</p>
        <h1 className="span-8">{t(about.title, lang)}</h1>
        <p className="span-8">{t(about.origin, lang)}</p>
        <p className="note span-8">{t(about.reachNote, lang)}</p>
      </header>
      <section className="section">
        <div className="grid statements">
          <div className="span-6">
            <h2>{t(about.missionLabel, lang)}</h2>
            <p className="statement">{t(about.mission, lang)}</p>
          </div>
          <div className="span-6">
            <h2>{t(about.visionLabel, lang)}</h2>
            <p>{t(about.vision, lang)}</p>
          </div>
        </div>
        <div className="grid">
          <div className="span-5">
            <h2>{t(about.valuesLabel, lang)}</h2>
            <ul className="value-line">
              {about.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
          <div className="span-7">
            <p>{t(about.method, lang)}</p>
            <p>{t(about.aim, lang)}</p>
            <h2>{lang === "pt" ? "Diretoria publicada" : lang === "en" ? "Published board" : "Direction publiée"}</h2>
            <p>{t(governance.mandate, lang)}</p>
            <ul className="plain-list">
              {governance.board.map((person) => (
                <li key={person.name}>
                  <strong>{person.name}</strong> — {person.role}
                </li>
              ))}
            </ul>
            <p className="fine">{t(governance.electedNote, lang)}</p>
            <p>{governance.elected.join(", ")}.</p>
            <p className="fine">{t(governance.bornNote, lang)}</p>
            <p>{governance.born.join(", ")}.</p>
          </div>
        </div>
      </section>
      <section className="section section-mist">
        <div className="grid">
          <h2 className="span-12">
            {lang === "pt" ? "Reconhecimento publicado" : lang === "en" ? "Published recognition" : "Reconnaissances publiées"}
          </h2>
          <ul className="award-list span-12">
            {awards.map((award) => (
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
        </div>
      </section>
    </article>
  );
}

export function ProjectsPage() {
  const lang = useLang();
  return (
    <article className="page">
      <header className="page-intro grid">
        <p className="kicker span-12">{t(pages.projects.nav, lang)}</p>
        <h1 className="span-8">{t(pages.projects.title, lang)}</h1>
        <p className="span-7">{t(pages.projects.description, lang)}</p>
      </header>
      <div className="project-index">
        {projects.map((project) => (
          <article key={project.slug} className="project-row">
            <Photo id={project.photo} alt={t(photoAlts[project.photo], lang)} />
            <div>
              <p className="kicker">
                {project.yearLabel} · {project.status}
              </p>
              <h2>
                <Link to={localize(lang, `${pages.projects.path}/${project.slug}`)}>{project.name}</Link>
              </h2>
              <p>{project.place ? t(project.place, lang) : t(ui.locationPending, lang)}</p>
            </div>
          </article>
        ))}
      </div>
    </article>
  );
}

export function ProjectPage() {
  const lang = useLang();
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <Missing />;
  return (
    <article className="page">
      <header className="page-intro grid">
        <p className="kicker span-12">
          <Link to={localize(lang, pages.projects.path)}>{t(pages.projects.nav, lang)}</Link>
          {" · "}
          {project.yearLabel}
        </p>
        <h1 className="span-8">{project.name}</h1>
        <p className="span-6">{t(project.summary, lang)}</p>
        <p className="span-6">
          <strong>{t(ui.placeLabel, lang)}: </strong>
          {project.place ? t(project.place, lang) : t(ui.locationPending, lang)}
        </p>
        <p className="fine span-6">
          {t(ui.statusPublished, lang)} {project.status}.
        </p>
        {project.filenameConflict ? <p className="note span-8">{t(ui.filenameNote, lang)}</p> : null}
      </header>
      <figure className="wide-photo">
        <Photo id={project.photo} alt={t(photoAlts[project.photo], lang)} />
        <figcaption>
          {project.photoKnown ? t(ui.identifiedCaption, lang) : t(ui.territoryCaption, lang)}
        </figcaption>
      </figure>
      <section className="section">
        <div className="grid">
          <div className="span-6">
            <h2>{t(ui.presentation, lang)}</h2>
            <a className="btn" href={project.pdf} target="_blank" rel="noreferrer">
              PDF
              <span className="visually-hidden"> — {t(ui.opensNew, lang)}</span>
            </a>
          </div>
          <div className="span-6">
            <h2>{t(pages.support.title, lang)}</h2>
            <p>{t(ui.externalChannel, lang)}</p>
            <Link className="text-link" to={localize(lang, pages.support.path)}>
              {t(ui.supportCta, lang)}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

export function StoriesPage() {
  const lang = useLang();
  return (
    <article className="page">
      <header className="page-intro grid">
        <p className="kicker span-12">{t(pages.stories.nav, lang)}</p>
        <h1 className="span-8">{t(pages.stories.title, lang)}</h1>
        <p className="span-7">{t(pages.stories.description, lang)}</p>
        <p className="note span-8">{t(ui.pendingQuote, lang)}</p>
      </header>
      <ol className="story-index">
        {stories.map((story, index) => (
          <li key={story.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <Link to={localize(lang, `${pages.stories.path}/${story.slug}`)}>{story.name}</Link>
            <em>{story.videoId ? t(ui.videoLabel, lang) : t(ui.pendingVideo, lang)}</em>
          </li>
        ))}
      </ol>
    </article>
  );
}

export function StoryPage() {
  const lang = useLang();
  const { slug } = useParams();
  const story = stories.find((item) => item.slug === slug);
  if (!story) return <Missing />;
  return (
    <article className="page">
      <header className="page-intro grid">
        <p className="kicker span-12">
          <Link to={localize(lang, pages.stories.path)}>{t(pages.stories.nav, lang)}</Link>
        </p>
        <h1 className="span-8">{story.name}</h1>
        <p className="note span-7">{t(ui.pendingQuote, lang)}</p>
        <p className="note span-7">{t(ui.pendingPhoto, lang)}</p>
        <p className="note span-7">{t(ui.pendingProject, lang)}</p>
        {story.videoId ? null : <p className="note span-7">{t(ui.pendingVideo, lang)}</p>}
        {story.embedTitle ? (
          <p className="fine span-7">
            {t(ui.embedTitle, lang)}: {story.embedTitle}
          </p>
        ) : null}
      </header>
      {story.videoId ? (
        <section className="section">
          <div className="grid">
            <div className="span-8">
              <VideoGate id={story.videoId} title={story.embedTitle ?? story.name} />
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}

export function ShopPage() {
  const lang = useLang();
  return (
    <article className="page">
      <header className="page-intro grid">
        <p className="kicker span-12">Loja RPT · {shop.platform}</p>
        <h1 className="span-8">{t(pages.shop.title, lang)}</h1>
        <p className="span-7">{t(shop.publishedLine, lang)}</p>
        <p className="span-7">{t(shop.publishedShort, lang)}</p>
        <p className="note span-7">{t(ui.shopDestination, lang)}</p>
        <p className="note span-7">{t(ui.shopEmpty, lang)}</p>
        <p className="fine span-7">{t(ui.shopFields, lang)}</p>
        <p className="fine span-7">{t(ui.noIntlShipping, lang)}</p>
        <p className="span-7">
          <a className="btn" href={shop.url} target="_blank" rel="noreferrer">
            {shop.platform}
            <span className="visually-hidden"> — {t(ui.opensNew, lang)}</span>
          </a>
        </p>
      </header>
    </article>
  );
}

export function SupportPage() {
  const lang = useLang();
  return (
    <article className="page">
      <header className="page-intro grid">
        <p className="kicker span-12">{t(pages.support.nav, lang)}</p>
        <h1 className="span-8">{t(pages.support.title, lang)}</h1>
        <p className="note span-7">{t(ui.externalChannel, lang)}</p>
      </header>
      <section className="section">
        <div className="grid">
          <div className="span-6">
            <h2>{lang === "pt" ? "Pessoa física" : lang === "en" ? "Individuals" : "Particuliers"}</h2>
            <ul className="link-stack">
              {donations.map((item) => (
                <li key={item.id}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {t(item.label, lang)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="span-6">
            <h2>{lang === "pt" ? "Empresas" : lang === "en" ? "Companies" : "Entreprises"}</h2>
            <p>
              {lang === "pt"
                ? "O site atual pede contato por e-mail para doar diretamente ou apoiar outros projetos incentivados."
                : lang === "en"
                  ? "The current site asks for an email to donate directly or to support other incentivised projects."
                  : "Le site actuel demande un e-mail pour donner directement ou soutenir d’autres projets avec incitation."}
            </p>
            <p>
              <a href={`mailto:${contacts.generalEmail}`}>{contacts.generalEmail}</a>
            </p>
            <p>
              <a href={`mailto:${contacts.marketingEmail}`}>{contacts.marketingEmail}</a>
              {" · "}
              <a href={`tel:${contacts.marketingPhone.replace(/[^\d+]/g, "")}`}>{contacts.marketingPhone}</a>
            </p>
            <ul className="link-stack">
              {extraForms.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {t(item.label, lang)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section section-mist">
        <div className="grid">
          <h2 className="span-12">{lang === "pt" ? "Serviços publicados" : lang === "en" ? "Published services" : "Services publiés"}</h2>
          {services.map((service) => (
            <article key={service.slug} className="span-4 service">
              <h3>{t(service.title, lang)}</h3>
              <p>{t(service.text, lang)}</p>
              {service.href ? (
                <a className="text-link" href={service.href} target="_blank" rel="noreferrer">
                  {t(ui.presentation, lang)}
                </a>
              ) : null}
              <p>
                <a href={`mailto:${service.contact}`}>{service.contact}</a>
              </p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}

export function TransparencyPage() {
  const lang = useLang();
  const groups = [
    { id: "gov", label: documents[0].type },
    { id: "report", label: documents.find((doc) => doc.title.startsWith("Anuário"))!.type },
    { id: "statement", label: documents.find((doc) => doc.title.startsWith("DRE"))!.type },
  ];
  return (
    <article className="page">
      <header className="page-intro grid">
        <p className="kicker span-12">{t(pages.transparency.nav, lang)}</p>
        <h1 className="span-8">{t(pages.transparency.title, lang)}</h1>
        <p className="span-7">{t(pages.transparency.description, lang)}</p>
        <p className="span-7">
          {lang === "pt"
            ? "Ouvidoria: "
            : lang === "en"
              ? "Ombudsman: "
              : "Médiation : "}
          <a href={`mailto:${contacts.ombudsmanEmail}`}>{contacts.ombudsmanEmail}</a>
        </p>
      </header>
      {groups.map((group) => (
        <section className="section doc-group" key={group.id}>
          <h2>{t(group.label, lang)}</h2>
          <ul className="doc-list">
            {documents
              .filter((doc) => doc.type.pt === group.label.pt)
              .map((doc) => (
                <li key={doc.href}>
                  <a href={doc.href} target="_blank" rel="noreferrer">
                    {doc.title}
                  </a>
                  <span>{doc.year}</span>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </article>
  );
}

export function ContactPage() {
  const lang = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [ready, setReady] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "done" | "fail">("idle");

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = t(ui.formNameError, lang);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = t(ui.formEmailError, lang);
    if (!message.trim()) next.message = t(ui.formMessageError, lang);
    setErrors(next);
    setCopyState("idle");
    if (Object.keys(next).length) {
      setReady(false);
      return;
    }
    setReady(true);
    const subject = encodeURIComponent(`Contato — ${name.trim()}`);
    const body = encodeURIComponent(`${name.trim()}\n${email.trim()}\n\n${message.trim()}`);
    window.location.href = `mailto:${contacts.generalEmail}?subject=${subject}&body=${body}`;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contacts.generalEmail);
      setCopyState("done");
    } catch {
      setCopyState("fail");
    }
  }

  return (
    <article className="page">
      <header className="page-intro grid">
        <p className="kicker span-12">{t(pages.contact.nav, lang)}</p>
        <h1 className="span-8">{t(pages.contact.title, lang)}</h1>
        <div className="span-6">
          <p>
            <a href={`mailto:${contacts.generalEmail}`}>{contacts.generalEmail}</a>
          </p>
          <p>
            São Paulo{" "}
            {contacts.saoPauloPhones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                {phone}{" "}
              </a>
            ))}
          </p>
          <p>
            Rio de Janeiro <a href={`mailto:${contacts.rioEmail}`}>{contacts.rioEmail}</a>
            {" · "}
            <a href={`tel:${contacts.rioPhone.replace(/[^\d+]/g, "")}`}>{contacts.rioPhone}</a>
          </p>
          <p>
            {lang === "pt" ? "Ouvidoria" : lang === "en" ? "Ombudsman" : "Médiation"}{" "}
            <a href={`mailto:${contacts.ombudsmanEmail}`}>{contacts.ombudsmanEmail}</a>
          </p>
        </div>
      </header>
      <section className="section">
        <form className="contact-form span-6" onSubmit={submit} noValidate>
          <p>{t(ui.formIntro, lang)}</p>
          <label>
            {t(ui.formName, lang)}
            <span className="visually-hidden"> ({t(ui.required, lang)})</span>
            <input
              name="name"
              autoComplete="name"
              value={name}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "err-name" : undefined}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          {errors.name ? (
            <p id="err-name" className="error" role="alert">
              {errors.name}
            </p>
          ) : null}
          <label>
            {t(ui.formEmail, lang)}
            <span className="visually-hidden"> ({t(ui.required, lang)})</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "err-email" : undefined}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          {errors.email ? (
            <p id="err-email" className="error" role="alert">
              {errors.email}
            </p>
          ) : null}
          <label>
            {t(ui.formMessage, lang)}
            <span className="visually-hidden"> ({t(ui.required, lang)})</span>
            <textarea
              name="message"
              rows={6}
              value={message}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "err-message" : undefined}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>
          {errors.message ? (
            <p id="err-message" className="error" role="alert">
              {errors.message}
            </p>
          ) : null}
          <button className="btn" type="submit">
            {t(ui.formSend, lang)}
          </button>
          {ready ? (
            <p role="status">
              {t(ui.formReady, lang)}{" "}
              <button type="button" className="text-link" onClick={copyEmail}>
                {t(ui.copyAddress, lang)}
              </button>
            </p>
          ) : null}
          {copyState === "done" ? <p role="status">{t(ui.copied, lang)}</p> : null}
          {copyState === "fail" ? <p role="status">{t(ui.copyFailed, lang)}</p> : null}
        </form>
      </section>
    </article>
  );
}

export function NewsPage() {
  const lang = useLang();
  return (
    <article className="page">
      <header className="page-intro grid">
        <p className="kicker span-12">{t(pages.news.nav, lang)}</p>
        <h1 className="span-8">{t(pages.news.title, lang)}</h1>
        <p className="span-7">{t(pages.news.description, lang)}</p>
        <p className="fine span-7">{t(ui.newsEmptyDate, lang)}</p>
      </header>
      <ul className="news-list page-news">
        {news.map((item) => (
          <li key={item.slug}>
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function NotFound() {
  return <Missing />;
}

function Missing() {
  const lang = useLang();
  return (
    <article className="page">
      <header className="page-intro grid">
        <h1 className="span-8">{t(ui.notFound, lang)}</h1>
        <p className="span-6">
          <Link className="text-link" to={localize(lang, "/")}>
            {t(ui.backHome, lang)}
          </Link>
        </p>
      </header>
    </article>
  );
}
