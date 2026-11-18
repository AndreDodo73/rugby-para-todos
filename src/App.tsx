import { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import { AnimatedNumber } from "./components/AnimatedNumber";
import {
  ContentSection,
  GovernanceSection,
  MethodologySection,
  ServicesSection,
  SupportSection,
  VideoStories,
} from "./components/InstitutionalSections";
import { institutional, official } from "./content/institutional";

type Language = "pt" | "en" | "fr";

const A = "/assets";

const copy = {
  pt: {
    nav: ["Impacto", "Histórias", "Projetos", "Parceiros"],
    donate: "Doe agora",
    eyebrow: "Paraisópolis · São Paulo · Desde 2004",
    heroA: "Começa",
    heroB: "no rugby.",
    heroC: "Vai muito além",
    heroD: "do campo.",
    heroBody:
      "Formamos atletas. Criamos oportunidades. Transformamos vidas por meio do esporte, da educação e da comunidade.",
    heroCta: "Conheça nossas histórias",
    scroll: "Role para descobrir",
    sponsorTitle: "Quem acredita, transforma junto.",
    sponsorBody: "Patrocinadores e apoiadores que entram em campo com o Instituto RPT.",
    impactEyebrow: "O campo é só o começo",
    impactTitle: "De Paraisópolis para o mundo.",
    impactBody:
      "Há mais de duas décadas, o rugby abre caminhos onde antes havia poucas oportunidades. Jovens que começaram no projeto hoje estudam, trabalham e competem no Brasil e no exterior — alguns chegaram à França e ao esporte olímpico.",
    numbers: [
      ["1.200+", "jovens atendidos"],
      ["20+", "anos de impacto"],
      ["34", "países conectados"],
      ["86", "famílias acompanhadas"],
    ],
    storiesEyebrow: "Vidas em movimento",
    storiesTitle: "O resultado tem nome, rosto e futuro.",
    storiesBody:
      "Por trás de cada número existe uma trajetória que começou na comunidade e ganhou o mundo.",
    storyLabel: "História",
    storyCta: "Conheça a trajetória",
    storyQuote:
      "“O rugby me ensinou que o lugar onde a gente começa não define até onde pode chegar.”",
    storyCopy:
      "Talento formado em Paraisópolis, hoje construindo uma trajetória internacional na França. Uma geração que inspira a próxima.",
    projectsEyebrow: "Onde atuamos",
    projectsTitle: "Projetos que criam possibilidades.",
    projectsBody:
      "Esporte, educação e desenvolvimento humano trabalhando juntos em cada fase da vida.",
    projectStatus: "Em execução",
    projects: ["RPT Paraisópolis", "Rugby Escolar", "RPT Cidades", "Intercâmbio Social"],
    projectDescriptions: [
      "Formação esportiva e cidadã no coração da comunidade.",
      "Valores do rugby dentro das escolas públicas.",
      "Uma metodologia social pronta para alcançar novos territórios.",
      "Experiências culturais e esportivas que atravessam fronteiras.",
    ],
    communityEyebrow: "Desde 2004",
    communityTitle: "Uma comunidade inteira joga junto.",
    communityBody:
      "Nascemos da inquietude de quem acreditava no esporte como ferramenta de desenvolvimento humano. Hoje, uma equipe multidisciplinar acompanha jovens e famílias para que cada conquista continue muito além das quatro linhas.",
    communityCta: "Conheça o Instituto",
    joinEyebrow: "Faça parte",
    joinTitle: "Toda transformação precisa de um time.",
    joinBody: "Sua doação mantém projetos, profissionais e oportunidades em movimento.",
    joinCta: "Quero transformar vidas",
    footerContact: "Contato",
    footerNav: "Navegue",
    footerNote: "Esporte, educação e oportunidades desde 2004.",
  },
  en: {
    nav: ["Impact", "Stories", "Projects", "Partners"],
    donate: "Donate now",
    eyebrow: "Paraisópolis · São Paulo · Since 2004",
    heroA: "It starts",
    heroB: "with rugby.",
    heroC: "It goes far",
    heroD: "beyond the field.",
    heroBody:
      "We develop athletes. We create opportunities. We transform lives through sport, education and community.",
    heroCta: "Meet our stories",
    scroll: "Scroll to discover",
    sponsorTitle: "Those who believe, transform with us.",
    sponsorBody: "Sponsors and supporters who take the field with Instituto RPT.",
    impactEyebrow: "The field is just the beginning",
    impactTitle: "From Paraisópolis to the world.",
    impactBody:
      "For over two decades, rugby has opened paths where opportunities were scarce. Young people who started here now study, work and compete in Brazil and abroad — some have reached France and Olympic sport.",
    numbers: [
      ["1,200+", "young people reached"],
      ["20+", "years of impact"],
      ["34", "countries connected"],
      ["86", "families supported"],
    ],
    storiesEyebrow: "Lives in motion",
    storiesTitle: "Impact has a name, a face and a future.",
    storiesBody:
      "Behind each number is a journey that began in the community and reached the world.",
    storyLabel: "Story",
    storyCta: "Discover the journey",
    storyQuote: "“Rugby taught me that where we start does not define how far we can go.”",
    storyCopy:
      "Talent developed in Paraisópolis, now building an international journey in France. A generation inspiring the next.",
    projectsEyebrow: "Where we work",
    projectsTitle: "Projects that create possibilities.",
    projectsBody: "Sport, education and human development working together at every stage of life.",
    projectStatus: "In progress",
    projects: ["RPT Paraisópolis", "School Rugby", "RPT Cities", "Social Exchange"],
    projectDescriptions: [
      "Sports and citizenship education at the heart of the community.",
      "Rugby values inside public schools.",
      "A social methodology ready to reach new territories.",
      "Cultural and sports experiences across borders.",
    ],
    communityEyebrow: "Since 2004",
    communityTitle: "An entire community plays together.",
    communityBody:
      "We were born from the belief that sport can drive human development. Today, a multidisciplinary team supports young people and families so every achievement continues far beyond the field.",
    communityCta: "Meet the Institute",
    joinEyebrow: "Join us",
    joinTitle: "Every transformation needs a team.",
    joinBody: "Your donation keeps projects, professionals and opportunities moving.",
    joinCta: "I want to transform lives",
    footerContact: "Contact",
    footerNav: "Explore",
    footerNote: "Sport, education and opportunity since 2004.",
  },
  fr: {
    nav: ["Impact", "Histoires", "Projets", "Partenaires"],
    donate: "Faire un don",
    eyebrow: "Paraisópolis · São Paulo · Depuis 2004",
    heroA: "Tout commence",
    heroB: "avec le rugby.",
    heroC: "Et va bien",
    heroD: "au-delà du terrain.",
    heroBody:
      "Nous formons des athlètes. Nous créons des opportunités. Nous transformons des vies par le sport, l'éducation et la communauté.",
    heroCta: "Découvrir nos histoires",
    scroll: "Faites défiler",
    sponsorTitle: "Ceux qui y croient transforment avec nous.",
    sponsorBody: "Sponsors et partenaires qui entrent sur le terrain avec l'Instituto RPT.",
    impactEyebrow: "Le terrain n'est que le début",
    impactTitle: "De Paraisópolis au monde.",
    impactBody:
      "Depuis plus de vingt ans, le rugby ouvre des chemins là où les opportunités étaient rares. Des jeunes du projet étudient, travaillent et concourent aujourd'hui au Brésil et à l'étranger — certains jusqu'en France et aux Jeux olympiques.",
    numbers: [
      ["1 200+", "jeunes accompagnés"],
      ["20+", "ans d'impact"],
      ["34", "pays connectés"],
      ["86", "familles accompagnées"],
    ],
    storiesEyebrow: "Des vies en mouvement",
    storiesTitle: "L'impact a un nom, un visage et un avenir.",
    storiesBody:
      "Derrière chaque chiffre se trouve un parcours né dans la communauté et ouvert sur le monde.",
    storyLabel: "Histoire",
    storyCta: "Découvrir le parcours",
    storyQuote:
      "« Le rugby m'a appris que notre point de départ ne définit pas jusqu'où nous pouvons aller. »",
    storyCopy:
      "Un talent formé à Paraisópolis, qui construit aujourd'hui un parcours international en France. Une génération qui inspire la suivante.",
    projectsEyebrow: "Nos actions",
    projectsTitle: "Des projets qui créent des possibilités.",
    projectsBody:
      "Le sport, l'éducation et le développement humain réunis à chaque étape de la vie.",
    projectStatus: "En cours",
    projects: ["RPT Paraisópolis", "Rugby scolaire", "RPT Villes", "Échange social"],
    projectDescriptions: [
      "Formation sportive et citoyenne au cœur de la communauté.",
      "Les valeurs du rugby dans les écoles publiques.",
      "Une méthode sociale prête à gagner de nouveaux territoires.",
      "Des expériences culturelles et sportives au-delà des frontières.",
    ],
    communityEyebrow: "Depuis 2004",
    communityTitle: "Toute une communauté joue ensemble.",
    communityBody:
      "Nous sommes nés de la conviction que le sport favorise le développement humain. Aujourd'hui, une équipe pluridisciplinaire accompagne les jeunes et leurs familles bien au-delà du terrain.",
    communityCta: "Découvrir l'Institut",
    joinEyebrow: "Rejoignez-nous",
    joinTitle: "Chaque transformation a besoin d'une équipe.",
    joinBody: "Votre don permet aux projets, aux professionnels et aux opportunités de continuer.",
    joinCta: "Je veux transformer des vies",
    footerContact: "Contact",
    footerNav: "Explorer",
    footerNote: "Sport, éducation et opportunités depuis 2004.",
  },
};

// Make hash lists. Only files present in public/assets are rendered
// (missing logos 404 as HTML via Vite SPA fallback and break the strip).
const sponsorsAll = [
  "51872.png", // Cultura / institucional
  "d2fa6.png", // Ministério / governo
  "680ac.png", // Lei de Incentivo
  "463ef.png", // Montana
  "2575f.png", // CSN (único)
  "c264d.png", // Outback variante patrocínio
  "2406a.png", // Yaman / outro
];
const supportersAll = [
  "05b7e.png", // Einstein
  "a8b5c.png", // Rede Esporte
  "64b7d.png", // CSN (único)
  "893eb.png", // Vita
  "9108e.png", // Outback
  "d51f0.png", // Facchini
];
const presentLogos = new Set([
  "05b7e.png",
  "2406a.png",
  "2575f.png",
  "463ef.png",
  "51872.png",
  "64b7d.png",
  "680ac.png",
  "893eb.png",
  "9108e.png",
  "a8b5c.png",
  "c264d.png",
  "d2fa6.png",
  "d51f0.png",
]);
const sponsors = sponsorsAll.filter((logo) => presentLogos.has(logo));
const supporters = [...new Set(supportersAll.filter((logo) => presentLogos.has(logo)))];
const storyImages = ["efd1c.png", "054c1.png", "6d6d5.png", "36764.png"];
const projectImages = ["38e25.png", "8b5c7.png", "dcc66.png", "46562.png"];

function Arrow() {
  // Make/Figma line arrow (↗) — color via currentColor (laranja ou branco).
  return (
    <span aria-hidden="true" className="arrow">
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

export default function App() {
  const [language, setLanguage] = useState<Language>("pt");
  const [activeStory, setActiveStory] = useState(0);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sponsorsPaused, setSponsorsPaused] = useState(false);
  const [activeSection, setActiveSection] = useState("impacto");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const t = copy[language];
  const extra = institutional[language];

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
      setIsScrolled(window.scrollY > 24);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        const menu = document.querySelector<HTMLDetailsElement>(".nav-more[open]");
        if (menu) {
          menu.open = false;
          menu.querySelector("summary")?.focus();
        }
      }
    };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, []);

  useEffect(() => {
    const sections = [
      "impacto",
      "historias",
      "projetos",
      "parceiros",
      "doe",
      "servicos",
      "instituto",
      "transparencia",
      "conteudos",
    ]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.3, 0.6] },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    document.documentElement.classList.add("motion-ready");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((element) => revealObserver.observe(element));

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, [language]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    setMenuOpen(false);
    document.querySelector<HTMLDetailsElement>(".nav-more")?.removeAttribute("open");
  };

  return (
    <main>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div
        className="scroll-progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <header className={isScrolled ? "site-header scrolled" : "site-header"}>
        <button
          className="brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Rugby Para Todos — início"
        >
          <img src={`${A}/logo-horizontal.png`} alt="Instituto Rugby Para Todos" />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          {t.nav.map((label, i) => (
            <button
              key={label}
              className={
                activeSection === ["impacto", "historias", "projetos", "parceiros"][i]
                  ? "active"
                  : ""
              }
              onClick={() => goTo(["impacto", "historias", "projetos", "parceiros"][i])}
              aria-current={
                activeSection === ["impacto", "historias", "projetos", "parceiros"][i]
                  ? "location"
                  : undefined
              }
            >
              {label}
            </button>
          ))}
          <details className="nav-more">
            <summary
              className={extra.links.some((link) => link.id === activeSection) ? "active" : ""}
            >
              {extra.more}
              <span className="nav-more-chevron" aria-hidden="true" />
            </summary>
            <div className="nav-extra" role="group" aria-label={extra.more}>
              {extra.links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => goTo(link.id)}
                  aria-current={activeSection === link.id ? "location" : undefined}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </details>
        </nav>
        <div className="header-actions">
          <div className="language-switcher" aria-label="Idioma">
            {(["pt", "en", "fr"] as Language[]).map((lang) => (
              <button
                key={lang}
                className={language === lang ? "active" : ""}
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                aria-label={lang === "pt" ? "Português" : lang === "en" ? "English" : "Français"}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="donate-small" onClick={() => goTo("doe")}>
            {t.donate}
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <Hero language={language} onJoin={() => goTo("doe")} />

      <section className="sponsors" id="parceiros">
        <div className="section-intro compact reveal">
          <div>
            <p className="eyebrow">Parceiros</p>
            <h2>{t.sponsorTitle}</h2>
          </div>
          <p>{t.sponsorBody}</p>
        </div>
        <div className="logo-marquee" data-paused={sponsorsPaused}>
          <div className="logo-track">
            {[...sponsors, ...sponsors].map((logo, i) => (
              <div className="logo-cell" key={`${logo}-${i}`}>
                <img src={`${A}/${logo}`} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="marquee-controls">
          <button
            className="marquee-toggle"
            onClick={() => setSponsorsPaused(!sponsorsPaused)}
            aria-pressed={sponsorsPaused}
          >
            <span className="marquee-status" aria-hidden="true" />
            {sponsorsPaused
              ? { pt: "Retomar movimento", en: "Resume motion", fr: "Reprendre l’animation" }[
                  language
                ]
              : { pt: "Pausar movimento", en: "Pause motion", fr: "Mettre en pause" }[language]}
          </button>
        </div>
      </section>

      <section className="impact" id="impacto">
        <div className="impact-image reveal reveal-image">
          <img src={`${A}/54817.png`} alt="Jovens atletas treinando rugby em Paraisópolis" />
        </div>
        <div className="impact-copy reveal">
          <p className="eyebrow">{t.impactEyebrow}</p>
          <h2>{t.impactTitle}</h2>
          <p className="lead">{t.impactBody}</p>
        </div>
        <div className="metrics reveal">
          {t.numbers.map(([number, label]) => (
            <div className="metric" key={label}>
              <AnimatedNumber value={number} language={language} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="stories" id="historias">
        <div className="section-intro on-dark reveal">
          <div>
            <p className="eyebrow light">{t.storiesEyebrow}</p>
            <h2>{t.storiesTitle}</h2>
          </div>
          <p>{t.storiesBody}</p>
        </div>
        <div className="story-stage reveal" aria-live="polite">
          <div className="story-photo">
            <img
              key={activeStory}
              src={`${A}/${storyImages[activeStory]}`}
              alt="Atleta do Instituto Rugby Para Todos"
            />
            <span className="story-count">0{activeStory + 1} / 04</span>
          </div>
          <article className="story-card">
            <p
              className="eyebrow"
              style={activeStory === 0 ? { color: "var(--paper)" } : undefined}
            >
              {t.storyLabel} 0{activeStory + 1}
            </p>
            <blockquote key={`${language}-${activeStory}`}>{t.storyQuote}</blockquote>
            <p>{t.storyCopy}</p>
            <button
              className="text-link"
              onClick={() => setActiveStory((activeStory + 1) % storyImages.length)}
            >
              <span className="link-label">{t.storyCta}</span>
              <Arrow />
            </button>
          </article>
          <div className="story-tabs">
            {storyImages.map((image, i) => (
              <button
                key={image}
                className={activeStory === i ? "active" : ""}
                onClick={() => setActiveStory(i)}
                aria-label={`História ${i + 1}`}
                aria-pressed={activeStory === i}
              >
                <img src={`${A}/${image}`} alt="" />
                <span>0{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <VideoStories language={language} />

      <section className="projects" id="projetos">
        <div className="section-intro reveal">
          <div>
            <p className="eyebrow">{t.projectsEyebrow}</p>
            <h2>{t.projectsTitle}</h2>
          </div>
          <p>{t.projectsBody}</p>
        </div>
        <div className="project-grid">
          {t.projects.map((project, i) => (
            <button
              type="button"
              className={`project-card reveal ${activeProject === i ? "active" : ""}`}
              key={project}
              onClick={() => setActiveProject(activeProject === i ? null : i)}
              aria-expanded={activeProject === i}
            >
              <img src={`${A}/${projectImages[i]}`} alt="" />
              <div className="project-overlay" />
              <div className="project-meta">
                <span>0{i + 1}</span>
                <span>{t.projectStatus}</span>
              </div>
              <div className="project-content">
                <h3>{project}</h3>
                <p>{t.projectDescriptions[i]}</p>
                <Arrow />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="community" id="instituto">
        <div className="community-copy reveal">
          <p className="eyebrow">{t.communityEyebrow}</p>
          <h2>{t.communityTitle}</h2>
          <p>{t.communityBody}</p>
          <button className="pill dark-pill" onClick={() => goTo("impacto")}>
            {t.communityCta}
            <Arrow />
          </button>
        </div>
        <div className="community-collage reveal">
          <img
            className="collage-main"
            src={`${A}/9a2ba.png`}
            alt="Treino do Instituto Rugby Para Todos em Paraisópolis"
          />
          <img
            className="collage-small"
            src={`${A}/e9a3a.png`}
            alt="Comunidade do Instituto Rugby Para Todos reunida"
          />
          <span className="collage-mark">
            RPT
            <br />
            04—24
          </span>
        </div>
      </section>

      <MethodologySection language={language} />
      <ServicesSection language={language} />

      <section className="supporters">
        <p className="eyebrow">Apoiadores institucionais</p>
        <div className="supporter-grid reveal">
          {supporters.map((logo) => (
            <div key={logo}>
              <img src={`${A}/${logo}`} alt="" />
            </div>
          ))}
        </div>
      </section>

      <GovernanceSection language={language} />

      <section className="join" id="doe">
        <div className="join-bg" />
        <div className="join-content reveal">
          <p className="eyebrow light">{t.joinEyebrow}</p>
          <h2>{t.joinTitle}</h2>
          <p>{t.joinBody}</p>
          <button className="pill light-pill" onClick={() => goTo("formas-de-apoiar")}>
            {t.joinCta}
            <Arrow />
          </button>
        </div>
      </section>

      <SupportSection language={language} />
      <ContentSection language={language} />

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <img src={`${A}/ff39b.png`} alt="Instituto Rugby Para Todos" />
            <p>{t.footerNote}</p>
          </div>
          <div>
            <p className="footer-label">{t.footerNav}</p>
            {t.nav.map((item, i) => (
              <button
                key={item}
                onClick={() => goTo(["impacto", "historias", "projetos", "parceiros"][i])}
              >
                {item}
              </button>
            ))}
            {extra.links.map((link) => (
              <button key={link.id} onClick={() => goTo(link.id)}>
                {link.label}
              </button>
            ))}
          </div>
          <div>
            <p className="footer-label">{t.footerContact}</p>
            <a href="mailto:rugbyparatodos@rugbyparatodos.org.br">
              rugbyparatodos@rugbyparatodos.org.br
            </a>
            <a href="tel:+551123710843">+55 (11) 2371-0843</a>
            <p>São Paulo, SP — Brasil</p>
            <div className="social-links">
              {official.social.map(({ icon, name, href }) => (
                <a
                  href={href}
                  aria-label={name}
                  key={name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`${A}/${icon}`} alt="" />
                </a>
              ))}
            </div>
          </div>
          <button
            className="back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑
          </button>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Instituto Rugby Para Todos</span>
          <span>Paraisópolis · São Paulo · Rio de Janeiro</span>
        </div>
      </footer>
    </main>
  );
}
