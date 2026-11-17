import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Footer, Header, ReviewBanner, Seo } from "./components/Chrome";
import { hero, pages } from "./content/site";
import { isLang } from "./content/types";
import { ui } from "./content/ui";
import { LocaleProvider, t, useLang } from "./locale";
import { HomePage } from "./pages/HomePage";
import {
  AboutPage,
  ContactPage,
  NewsPage,
  NotFound,
  ProjectPage,
  ProjectsPage,
  ShopPage,
  StoriesPage,
  StoryPage,
  SupportPage,
  TransparencyPage,
} from "./pages/InnerPages";

function LocaleFrame() {
  const { lang } = useParams();
  if (!isLang(lang)) return <Navigate to="/pt" replace />;
  return (
    <LocaleProvider lang={lang}>
      <Frame />
    </LocaleProvider>
  );
}

function Frame() {
  const lang = useLang();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const rest = pathname.replace(/^\/(pt|en|fr)(?=\/|$)/, "");
  const key = rest.split("/").filter(Boolean)[0] ?? "";
  const table = {
    "": pages.home,
    "o-rpt": pages.about,
    projetos: pages.projects,
    historias: pages.stories,
    loja: pages.shop,
    apoie: pages.support,
    transparencia: pages.transparency,
    contato: pages.contact,
    noticias: pages.news,
  } as const;
  const current = key in table ? table[key as keyof typeof table] : pages.home;
  const title =
    key === ""
      ? `${t(hero.titleA, lang)} ${t(hero.titleB, lang)} — Instituto Rugby Para Todos`
      : `${t(current.title, lang)} — Instituto Rugby Para Todos`;

  return (
    <>
      <a className="skip" href="#conteudo">
        {t(ui.skip, lang)}
      </a>
      <Seo title={title} description={t(current.description, lang)} />
      <Header />
      <ReviewBanner />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pt" replace />} />
      <Route path="/:lang" element={<LocaleFrame />}>
        <Route index element={<HomePage />} />
        <Route path="o-rpt" element={<AboutPage />} />
        <Route path="projetos" element={<ProjectsPage />} />
        <Route path="projetos/:slug" element={<ProjectPage />} />
        <Route path="historias" element={<StoriesPage />} />
        <Route path="historias/:slug" element={<StoryPage />} />
        <Route path="loja" element={<ShopPage />} />
        <Route path="apoie" element={<SupportPage />} />
        <Route path="transparencia" element={<TransparencyPage />} />
        <Route path="contato" element={<ContactPage />} />
        <Route path="noticias" element={<NewsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
