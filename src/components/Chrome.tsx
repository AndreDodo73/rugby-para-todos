import { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { pages, socials, contacts, source } from "../content/site";
import { langs, type Lang } from "../content/types";
import { ui } from "../content/ui";
import { localize, t, useLang } from "../locale";

const langNames: Record<Lang, string> = {
  pt: "Português",
  en: "English",
  fr: "Français",
};

function LangSwitch({ labelledBy }: { labelledBy?: string }) {
  const lang = useLang();
  const { pathname, search } = useLocation();
  const rest = pathname.replace(/^\/(pt|en|fr)(?=\/|$)/, "") || "/";
  return (
    <div className="lang" role="group" aria-labelledby={labelledBy}>
      {langs.map((code) => {
        const to = `/${code}${rest === "/" ? "" : rest}${search}`;
        const current = code === lang;
        return (
          <Link
            key={code}
            to={to}
            hrefLang={code === "pt" ? "pt-BR" : code}
            lang={code === "pt" ? "pt-BR" : code}
            aria-current={current ? "true" : undefined}
            aria-label={langNames[code]}
            className={current ? "is-current" : undefined}
          >
            {code.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

export function Header() {
  const lang = useLang();
  const location = useLocation();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const moreId = useId();
  const menuId = useId();
  const langId = useId();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMore(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    return () => document.documentElement.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open && !more) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMore(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, more]);

  const primary = [pages.about, pages.projects, pages.stories, pages.shop];

  return (
    <header className={solid || open ? "site-header is-solid" : "site-header"}>
      <Link className="logo" to={localize(lang, "/")}>
        <img src="/logo.png" width={164} height={201} alt={t(pages.home.title, lang)} />
      </Link>

      <nav className="primary-nav" aria-label={t(ui.navLabel, lang)}>
        {primary.map((item) => (
          <NavLink key={item.path} to={localize(lang, item.path)}>
            {t(item.nav, lang)}
          </NavLink>
        ))}
        <span className="more">
          <button
            type="button"
            className="text-button"
            aria-expanded={more}
            aria-controls={moreId}
            onClick={() => setMore((value) => !value)}
          >
            {t(ui.more, lang)}
          </button>
          {more ? (
            <div id={moreId} className="more-panel">
              <Link to={localize(lang, pages.transparency.path)}>{t(pages.transparency.nav, lang)}</Link>
              <Link to={localize(lang, pages.contact.path)}>{t(pages.contact.nav, lang)}</Link>
            </div>
          ) : null}
        </span>
      </nav>

      <div className="header-tools">
        <p id={langId} className="visually-hidden">
          {t(ui.langLabel, lang)}
        </p>
        <LangSwitch labelledBy={langId} />
        <Link className="btn btn-header" to={localize(lang, pages.support.path)}>
          <span className="cta-short">{t(ui.supportShort, lang)}</span>
          <span className="cta-full">{t(ui.supportCta, lang)}</span>
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">{open ? t(ui.closeMenu, lang) : t(ui.openMenu, lang)}</span>
          <span aria-hidden="true" className="menu-bars" />
        </button>
      </div>

      {open ? (
        <nav id={menuId} className="mobile-nav" aria-label={t(ui.navLabel, lang)}>
          {primary.map((item) => (
            <NavLink key={item.path} to={localize(lang, item.path)}>
              {t(item.nav, lang)}
            </NavLink>
          ))}
          <NavLink to={localize(lang, pages.transparency.path)}>{t(pages.transparency.nav, lang)}</NavLink>
          <NavLink to={localize(lang, pages.contact.path)}>{t(pages.contact.nav, lang)}</NavLink>
          <Link className="btn" to={localize(lang, pages.support.path)}>
            {t(ui.supportCta, lang)}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  const lang = useLang();
  const langId = useId();
  return (
    <footer className="site-footer">
      <div className="grid footer-grid">
        <div className="span-5">
          <p className="kicker">{t(pages.home.title, lang)}</p>
          <p className="footer-lead">{t(ui.footerNote, lang)}</p>
          <p className="fine">
            <a href={source.url}>rugbyparatodos.org.br</a>
          </p>
        </div>
        <div className="span-3">
          <p className="kicker">{t(pages.contact.nav, lang)}</p>
          <ul className="plain-list">
            <li>
              <a href={`mailto:${contacts.generalEmail}`}>{contacts.generalEmail}</a>
            </li>
            <li>
              <a href={`mailto:${contacts.ombudsmanEmail}`}>{contacts.ombudsmanEmail}</a>
            </li>
            {contacts.saoPauloPhones.map((phone) => (
              <li key={phone}>
                São Paulo <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
              </li>
            ))}
            <li>
              Rio de Janeiro{" "}
              <a href={`tel:${contacts.rioPhone.replace(/[^\d+]/g, "")}`}>{contacts.rioPhone}</a>
            </li>
          </ul>
        </div>
        <div className="span-2">
          <p className="kicker">{t(pages.news.nav, lang)}</p>
          <ul className="plain-list">
            <li>
              <Link to={localize(lang, pages.news.path)}>{t(pages.news.nav, lang)}</Link>
            </li>
            <li>
              <Link to={localize(lang, pages.transparency.path)}>{t(pages.transparency.nav, lang)}</Link>
            </li>
            <li>
              <Link to={localize(lang, pages.support.path)}>{t(pages.support.nav, lang)}</Link>
            </li>
          </ul>
        </div>
        <div className="span-2">
          <p className="kicker">{t(ui.socials, lang)}</p>
          <ul className="plain-list">
            {socials.map((item) => (
              <li key={item.id}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                  <span className="visually-hidden"> — {t(ui.opensNew, lang)}</span>
                </a>
              </li>
            ))}
          </ul>
          <p id={langId} className="kicker lang-footer-label">
            {t(ui.langLabel, lang)}
          </p>
          <LangSwitch labelledBy={langId} />
        </div>
      </div>
    </footer>
  );
}

export function Seo({ title, description }: { title: string; description: string }) {
  const lang = useLang();
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    document.title = title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    descriptionTag?.setAttribute("content", description);

    const origin = window.location.origin;
    const rest = pathname.replace(/^\/(pt|en|fr)(?=\/|$)/, "") || "/";
    const links: { rel: string; href: string; hrefLang?: string }[] = [
      { rel: "canonical", href: `${origin}${pathname}` },
      ...langs.map((code) => ({
        rel: "alternate",
        hrefLang: code === "pt" ? "pt-BR" : code,
        href: `${origin}/${code}${rest === "/" ? "" : rest}`,
      })),
      { rel: "alternate", hrefLang: "x-default", href: `${origin}/pt${rest === "/" ? "" : rest}` },
    ];

    document.querySelectorAll("link[data-seo]").forEach((node) => node.remove());
    for (const item of links) {
      const link = document.createElement("link");
      link.rel = item.rel;
      link.href = item.href;
      if (item.hrefLang) link.hreflang = item.hrefLang;
      link.dataset.seo = "true";
      document.head.appendChild(link);
    }
  }, [description, lang, pathname, title]);

  return null;
}

export function ReviewBanner() {
  const lang = useLang();
  if (lang === "pt") return null;
  return (
    <p className="review-banner" role="note">
      {t(ui.reviewBanner, lang)}
    </p>
  );
}
