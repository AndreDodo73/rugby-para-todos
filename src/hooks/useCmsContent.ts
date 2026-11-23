import { useEffect, useState } from "react";
import type { SiteLanguage } from "../content/institutional";
import { fetchShopOverrides, fetchSiteMedia, fetchSiteTexts, type ShopProductOverride } from "../lib/cms";

export type CmsContent = {
  ready: boolean;
  texts: Record<string, string>;
  media: Record<string, string>;
  shop: ShopProductOverride[];
};

const empty: CmsContent = {
  ready: false,
  texts: {},
  media: {},
  shop: [],
};

export function useCmsContent(language: SiteLanguage): CmsContent {
  const [state, setState] = useState<CmsContent>(empty);

  useEffect(() => {
    let cancelled = false;
    setState((current) => ({ ...current, ready: false }));
    (async () => {
      const [texts, media, shop] = await Promise.all([
        fetchSiteTexts(language),
        fetchSiteMedia(),
        fetchShopOverrides(),
      ]);
      if (cancelled) return;
      setState({ ready: true, texts, media, shop });
    })();
    return () => {
      cancelled = true;
    };
  }, [language]);

  return state;
}
