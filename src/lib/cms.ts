import { supabase } from "./supabase";

export type ShopProductOverride = {
  id: string;
  priceCents: number | null;
  image: string | null;
  sortOrder: number;
};

export type SiteTextOverride = {
  key: string;
  locale: string;
  value: string;
};

/** Lê preços/imagens da loja no Supabase. Se falhar, devolve []. */
export async function fetchShopOverrides(): Promise<ShopProductOverride[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("shop_products")
    .select("id, price_cents, image, sort_order")
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id as string,
    priceCents: (row.price_cents as number | null) ?? null,
    image: (row.image as string | null) ?? null,
    sortOrder: (row.sort_order as number) ?? 0,
  }));
}

/** Lê textos editáveis. Chave exemplo: shop.sectionTitle */
export async function fetchSiteTexts(locale: string): Promise<Record<string, string>> {
  if (!supabase) return {};
  const { data, error } = await supabase.from("site_texts").select("key, value").eq("locale", locale);
  if (error || !data) return {};
  return Object.fromEntries(data.map((row) => [row.key as string, row.value as string]));
}
