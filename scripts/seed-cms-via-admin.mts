import { createClient } from "@supabase/supabase-js";
import { MEDIA_FIELDS, TEXT_FIELDS } from "../src/content/cmsCatalog.ts";

const url = process.env.VITE_SUPABASE_URL;
const anon = process.env.VITE_SUPABASE_ANON_KEY;
if (!url || !anon) throw new Error("Missing Supabase env");

const email = process.env.RPT_ADMIN_EMAIL ?? "andre@jabuticabadesign.com";
const password = process.env.RPT_ADMIN_PASSWORD ?? "RptAdmin2026!";

const supabase = createClient(url, anon);
const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
if (authError) throw authError;

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

const { data: existingTexts } = await supabase.from("site_texts").select("key, locale");
const textSet = new Set((existingTexts ?? []).map((row) => `${row.key}::${row.locale}`));
const missingTexts = textRows.filter((row) => !textSet.has(`${row.key}::${row.locale}`));

for (let i = 0; i < missingTexts.length; i += 50) {
  const chunk = missingTexts.slice(i, i + 50);
  const { error } = await supabase.from("site_texts").insert(chunk);
  if (error) throw error;
  console.log("inserted texts", chunk.length);
}

const mediaRows = MEDIA_FIELDS.map((field) => ({
  key: field.key,
  url: field.defaultUrl,
  alt: field.alt ?? field.label,
  section: field.section,
  label: field.label,
  updated_at: new Date().toISOString(),
}));
const { data: existingMedia } = await supabase.from("site_media").select("key");
const mediaSet = new Set((existingMedia ?? []).map((row) => row.key as string));
const missingMedia = mediaRows.filter((row) => !mediaSet.has(row.key));
if (missingMedia.length) {
  const { error } = await supabase.from("site_media").insert(missingMedia);
  if (error) throw error;
}

const { count: textCount } = await supabase.from("site_texts").select("*", { count: "exact", head: true });
const { count: mediaCount } = await supabase.from("site_media").select("*", { count: "exact", head: true });
const { data: shop } = await supabase.from("shop_products").select("id, price_cents");
console.log({
  missingTexts: missingTexts.length,
  missingMedia: missingMedia.length,
  textCount,
  mediaCount,
  shop,
});
await supabase.auth.signOut();
