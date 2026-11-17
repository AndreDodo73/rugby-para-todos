import { createContext, useContext, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import type { Copy, Lang } from "./content/types";
import { isLang } from "./content/types";

const LocaleContext = createContext<Lang>("pt");

export function LocaleProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LocaleContext);
}

export function t(copy: Copy, lang: Lang): string {
  return copy[lang];
}

export function useT(): (copy: Copy) => string {
  const lang = useLang();
  return (copy) => copy[lang];
}

export function useLangParam(): Lang | null {
  const { lang } = useParams();
  return isLang(lang) ? lang : null;
}

export function localize(lang: Lang, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${clean === "/" ? "" : clean}`;
}

