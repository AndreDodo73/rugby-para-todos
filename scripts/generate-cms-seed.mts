import { MEDIA_FIELDS, TEXT_FIELDS } from "../src/content/cmsCatalog.ts";

function esc(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "''").replace(/\r?\n/g, "\\n");
}

function lit(value: string) {
  return `E'${esc(value)}'`;
}

const textValues = TEXT_FIELDS.flatMap((field) =>
  (["pt", "en", "fr"] as const).map(
    (locale) =>
      `(${lit(field.key)},${lit(locale)},${lit(field.defaults[locale])},${lit(field.section)},${lit(field.label)})`,
  ),
);

const mediaValues = MEDIA_FIELDS.map(
  (field) =>
    `(${lit(field.key)},${lit(field.defaultUrl)},${lit(field.alt ?? field.label)},${lit(field.section)},${lit(field.label)})`,
);

const sql = `
INSERT INTO public.site_texts (key, locale, value, section, label)
VALUES
${textValues.join(",\n")}
ON CONFLICT (key, locale) DO UPDATE SET
  section = EXCLUDED.section,
  label = EXCLUDED.label,
  updated_at = now();

INSERT INTO public.site_media (key, url, alt, section, label)
VALUES
${mediaValues.join(",\n")}
ON CONFLICT (key) DO UPDATE SET
  section = EXCLUDED.section,
  label = EXCLUDED.label,
  updated_at = now();
`;

process.stdout.write(sql);
