export const langs = ["pt", "en", "fr"] as const;
export type Lang = (typeof langs)[number];

export type Copy = Record<Lang, string>;

export function tx(pt: string, en: string, fr: string): Copy {
  return { pt, en, fr };
}

export function isLang(value: string | undefined): value is Lang {
  return value === "pt" || value === "en" || value === "fr";
}
