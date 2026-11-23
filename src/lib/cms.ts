import { MEDIA_FIELDS, TEXT_FIELDS } from "../content/cmsCatalog";
import { supabase } from "./supabase";

export type ShopProductOverride = {
  id: string;
  priceCents: number | null;
  image: string | null;
  sortOrder: number;
};

export type SiteTextRow = {
  key: string;
  locale: string;
  value: string;
  section?: string | null;
  label?: string | null;
};

export type SiteMediaRow = {
  key: string;
  url: string;
  alt: string | null;
  section?: string | null;
  label?: string | null;
};

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

export async function fetchSiteTexts(locale: string): Promise<Record<string, string>> {
  if (!supabase) return {};
  const { data, error } = await supabase.from("site_texts").select("key, value").eq("locale", locale);
  if (error || !data) return {};
  return Object.fromEntries(data.map((row) => [row.key as string, row.value as string]));
}

export async function fetchSiteMedia(): Promise<Record<string, string>> {
  if (!supabase) return {};
  const { data, error } = await supabase.from("site_media").select("key, url");
  if (error || !data) return {};
  return Object.fromEntries(data.map((row) => [row.key as string, row.url as string]));
}

export async function fetchAllSiteTexts(): Promise<SiteTextRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("site_texts")
    .select("key, locale, value, section, label")
    .order("section", { ascending: true })
    .order("key", { ascending: true });
  if (error || !data) return [];
  return data as SiteTextRow[];
}

export async function fetchAllSiteMedia(): Promise<SiteMediaRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("site_media")
    .select("key, url, alt, section, label")
    .order("section", { ascending: true })
    .order("key", { ascending: true });
  if (error || !data) return [];
  return data as SiteMediaRow[];
}

export async function upsertSiteText(input: {
  key: string;
  locale: string;
  value: string;
  section?: string;
  label?: string;
}) {
  if (!supabase) throw new Error("Supabase não configurado");
  const { error } = await supabase.from("site_texts").upsert(
    {
      key: input.key,
      locale: input.locale,
      value: input.value,
      section: input.section ?? null,
      label: input.label ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key,locale" },
  );
  if (error) throw error;
}

export async function upsertSiteMedia(input: {
  key: string;
  url: string;
  alt?: string;
  section?: string;
  label?: string;
}) {
  if (!supabase) throw new Error("Supabase não configurado");
  const { error } = await supabase.from("site_media").upsert(
    {
      key: input.key,
      url: input.url,
      alt: input.alt ?? null,
      section: input.section ?? null,
      label: input.label ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );
  if (error) throw error;
}

export async function upsertShopProduct(input: {
  id: string;
  priceCents: number | null;
  image?: string | null;
  sortOrder?: number;
}) {
  if (!supabase) throw new Error("Supabase não configurado");
  const { error } = await supabase.from("shop_products").upsert(
    {
      id: input.id,
      price_cents: input.priceCents,
      image: input.image ?? null,
      sort_order: input.sortOrder ?? 0,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );
  if (error) throw error;
}

export async function uploadSiteImage(key: string, file: File) {
  if (!supabase) throw new Error("Supabase não configurado");
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${key.replace(/\./g, "/")}-${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type || "image/jpeg",
  });
  if (uploadError) throw uploadError;
  const { data } = supabase.storage.from("site-media").getPublicUrl(path);
  return data.publicUrl;
}

/** Seeds missing catalog rows from the current site copy (idempotent). */
export async function ensureCatalogSeeded() {
  if (!supabase) return { texts: 0, media: 0 };

  const textRows = TEXT_FIELDS.flatMap((field) =>
    (["pt", "en", "fr"] as const).map((locale) => ({
      key: field.key,
      locale,
      value: field.defaults[locale],
      section: field.section,
      label: field.label,
      updated_at: new Date().toISOString(),
    })),
  );

  const mediaRows = MEDIA_FIELDS.map((field) => ({
    key: field.key,
    url: field.defaultUrl,
    alt: field.alt ?? field.label,
    section: field.section,
    label: field.label,
    updated_at: new Date().toISOString(),
  }));

  // Only insert missing keys so admin edits are preserved.
  const { data: existingTexts } = await supabase.from("site_texts").select("key, locale");
  const textSet = new Set((existingTexts ?? []).map((row) => `${row.key}::${row.locale}`));
  const missingTexts = textRows.filter((row) => !textSet.has(`${row.key}::${row.locale}`));
  if (missingTexts.length) {
    const { error } = await supabase.from("site_texts").insert(missingTexts);
    if (error) throw error;
  }

  const { data: existingMedia } = await supabase.from("site_media").select("key");
  const mediaSet = new Set((existingMedia ?? []).map((row) => row.key as string));
  const missingMedia = mediaRows.filter((row) => !mediaSet.has(row.key));
  if (missingMedia.length) {
    const { error } = await supabase.from("site_media").insert(missingMedia);
    if (error) throw error;
  }

  return { texts: missingTexts.length, media: missingMedia.length };
}
