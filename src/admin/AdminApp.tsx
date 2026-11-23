import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { MEDIA_FIELDS, TEXT_FIELDS } from "../content/cmsCatalog";
import { shopProducts, type SiteLanguage } from "../content/institutional";
import {
  ensureCatalogSeeded,
  fetchAllSiteMedia,
  fetchAllSiteTexts,
  fetchShopOverrides,
  uploadSiteImage,
  upsertShopProduct,
  upsertSiteMedia,
  upsertSiteText,
  type ShopProductOverride,
  type SiteMediaRow,
} from "../lib/cms";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import "./admin.css";

type Tab = "textos" | "fotos" | "loja";

const LOCALES: { id: SiteLanguage; label: string }[] = [
  { id: "pt", label: "Português" },
  { id: "en", label: "English" },
  { id: "fr", label: "Français" },
];

function bySection<T extends { section: string }>(items: T[]) {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const list = map.get(item.section) ?? [];
    list.push(item);
    map.set(item.section, list);
  }
  return [...map.entries()];
}

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<Tab>("textos");
  const [locale, setLocale] = useState<SiteLanguage>("pt");
  const [media, setMedia] = useState<SiteMediaRow[]>([]);
  const [shop, setShop] = useState<ShopProductOverride[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [priceDrafts, setPriceDrafts] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setBootstrapping(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setBootstrapping(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function loadCms() {
    if (!supabase) return;
    setBusy(true);
    setStatus("Carregando conteúdo…");
    try {
      await ensureCatalogSeeded();
      const [textRows, mediaRows, shopRows] = await Promise.all([
        fetchAllSiteTexts(),
        fetchAllSiteMedia(),
        fetchShopOverrides(),
      ]);
      setMedia(mediaRows);
      setShop(shopRows);
      const nextDrafts: Record<string, string> = {};
      for (const field of TEXT_FIELDS) {
        for (const lang of ["pt", "en", "fr"] as const) {
          const found = textRows.find((row) => row.key === field.key && row.locale === lang);
          nextDrafts[`${field.key}::${lang}`] = found?.value ?? field.defaults[lang];
        }
      }
      setDrafts(nextDrafts);
      const nextPrices: Record<string, string> = {};
      for (const product of shopProducts) {
        const row = shopRows.find((item) => item.id === product.id);
        nextPrices[product.id] = row?.priceCents != null ? String(row.priceCents / 100) : "";
      }
      setPriceDrafts(nextPrices);
      setStatus("Pronto para editar.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Falha ao carregar o conteúdo.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (session) void loadCms();
  }, [session]);

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setAuthError("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setAuthError("Não foi possível entrar. Confira e-mail e senha.");
  }

  async function onLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  }

  async function saveText(key: string) {
    const field = TEXT_FIELDS.find((item) => item.key === key);
    if (!field) return;
    setBusy(true);
    setStatus(`Salvando “${field.label}”…`);
    try {
      await upsertSiteText({
        key,
        locale,
        value: drafts[`${key}::${locale}`] ?? "",
        section: field.section,
        label: field.label,
      });
      setStatus(`Texto “${field.label}” salvo.`);
      await loadCms();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Erro ao salvar texto.");
    } finally {
      setBusy(false);
    }
  }

  async function saveAllTextsInLocale() {
    setBusy(true);
    setStatus("Salvando todos os textos deste idioma…");
    try {
      for (const field of TEXT_FIELDS) {
        await upsertSiteText({
          key: field.key,
          locale,
          value: drafts[`${field.key}::${locale}`] ?? field.defaults[locale],
          section: field.section,
          label: field.label,
        });
      }
      setStatus("Todos os textos deste idioma foram salvos.");
      await loadCms();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Erro ao salvar textos.");
    } finally {
      setBusy(false);
    }
  }

  async function replacePhoto(key: string, file: File | null) {
    const field = MEDIA_FIELDS.find((item) => item.key === key);
    if (!field || !file) return;
    setBusy(true);
    setStatus(`Enviando foto “${field.label}”…`);
    try {
      const url = await uploadSiteImage(key, file);
      await upsertSiteMedia({
        key,
        url,
        alt: field.alt,
        section: field.section,
        label: field.label,
      });
      if (key.startsWith("shop.") && key.endsWith(".image")) {
        const productId = key.slice("shop.".length, -".image".length);
        const current = shop.find((item) => item.id === productId);
        await upsertShopProduct({
          id: productId,
          priceCents: current?.priceCents ?? null,
          image: url,
          sortOrder: current?.sortOrder ?? 0,
        });
      }
      setStatus(`Foto “${field.label}” atualizada.`);
      await loadCms();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Erro ao enviar foto.");
    } finally {
      setBusy(false);
    }
  }

  async function saveShopPrice(productId: string) {
    setBusy(true);
    setStatus("Salvando preço…");
    try {
      const raw = priceDrafts[productId]?.trim() ?? "";
      const priceCents = raw === "" ? null : Math.round(Number(raw.replace(",", ".")) * 100);
      if (raw !== "" && !Number.isFinite(priceCents)) {
        throw new Error("Informe um valor numérico válido, ou deixe em branco.");
      }
      const current = shop.find((item) => item.id === productId);
      const mediaKey = `shop.${productId}.image`;
      const mediaRow = media.find((item) => item.key === mediaKey);
      await upsertShopProduct({
        id: productId,
        priceCents,
        image: current?.image ?? mediaRow?.url ?? null,
        sortOrder: current?.sortOrder ?? shopProducts.findIndex((p) => p.id === productId) * 10 + 10,
      });
      setStatus(priceCents == null ? "Preço marcado como sob consulta." : "Preço salvo.");
      await loadCms();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Erro ao salvar preço.");
    } finally {
      setBusy(false);
    }
  }

  const textSections = useMemo(() => bySection(TEXT_FIELDS), []);
  const mediaSections = useMemo(() => bySection(MEDIA_FIELDS), []);
  const mediaByKey = useMemo(() => Object.fromEntries(media.map((row) => [row.key, row])), [media]);

  if (!isSupabaseConfigured || !supabase) {
    return (
      <main className="admin-shell">
        <div className="admin-card">
          <h1>Painel do Instituto</h1>
          <p>
            Falta configurar <code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_ANON_KEY</code> neste
            ambiente.
          </p>
        </div>
      </main>
    );
  }

  if (bootstrapping) {
    return (
      <main className="admin-shell">
        <p className="admin-muted">Abrindo o painel…</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="admin-shell">
        <form className="admin-card admin-login" onSubmit={onLogin}>
          <p className="admin-kicker">Instituto Rugby Para Todos</p>
          <h1>Entrar no painel</h1>
          <p className="admin-muted">Altere textos e fotos do site sem mexer no código.</p>
          <label>
            E-mail
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {authError ? <p className="admin-error">{authError}</p> : null}
          <button type="submit" className="admin-primary" disabled={busy}>
            Entrar
          </button>
          <a className="admin-link" href="/">
            Voltar ao site
          </a>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-top">
        <div>
          <p className="admin-kicker">Painel do Instituto</p>
          <h1>Textos e fotos do site</h1>
          <p className="admin-muted">Logado como {session.user.email}</p>
        </div>
        <div className="admin-top-actions">
          <a className="admin-link" href="/" target="_blank" rel="noreferrer">
            Ver site
          </a>
          <button type="button" className="admin-secondary" onClick={onLogout}>
            Sair
          </button>
        </div>
      </header>

      <nav className="admin-tabs" aria-label="Seções do painel">
        {(
          [
            ["textos", "Textos"],
            ["fotos", "Fotos"],
            ["loja", "Loja"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "active" : ""}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <p className="admin-status" role="status">
        {busy ? "Processando…" : status}
      </p>

      {tab === "textos" ? (
        <section className="admin-panel">
          <div className="admin-toolbar">
            <label>
              Idioma
              <select value={locale} onChange={(event) => setLocale(event.target.value as SiteLanguage)}>
                {LOCALES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" className="admin-primary" disabled={busy} onClick={saveAllTextsInLocale}>
              Salvar todos deste idioma
            </button>
          </div>
          {textSections.map(([section, fields]) => (
            <div className="admin-section" key={section}>
              <h2>{section}</h2>
              {fields.map((field) => {
                const draftKey = `${field.key}::${locale}`;
                return (
                  <article className="admin-field" key={field.key}>
                    <label htmlFor={draftKey}>{field.label}</label>
                    {field.multiline === false ? (
                      <input
                        id={draftKey}
                        value={drafts[draftKey] ?? ""}
                        onChange={(event) =>
                          setDrafts((current) => ({ ...current, [draftKey]: event.target.value }))
                        }
                      />
                    ) : (
                      <textarea
                        id={draftKey}
                        rows={4}
                        value={drafts[draftKey] ?? ""}
                        onChange={(event) =>
                          setDrafts((current) => ({ ...current, [draftKey]: event.target.value }))
                        }
                      />
                    )}
                    <button
                      type="button"
                      className="admin-secondary"
                      disabled={busy}
                      onClick={() => saveText(field.key)}
                    >
                      Salvar
                    </button>
                  </article>
                );
              })}
            </div>
          ))}
        </section>
      ) : null}

      {tab === "fotos" ? (
        <section className="admin-panel">
          {mediaSections.map(([section, fields]) => (
            <div className="admin-section" key={section}>
              <h2>{section}</h2>
              <div className="admin-media-grid">
                {fields.map((field) => {
                  const current = mediaByKey[field.key]?.url || field.defaultUrl;
                  return (
                    <article className="admin-media-card" key={field.key}>
                      <div className="admin-media-preview">
                        <img src={current} alt={field.alt || field.label} />
                      </div>
                      <h3>{field.label}</h3>
                      <label className="admin-file">
                        Trocar foto
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                          disabled={busy}
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            void replacePhoto(field.key, file);
                            event.target.value = "";
                          }}
                        />
                      </label>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {tab === "loja" ? (
        <section className="admin-panel">
          <p className="admin-muted">
            Deixe o preço em branco para mostrar “Sob consulta” no site. Só preencha quando o valor
            estiver confirmado.
          </p>
          <div className="admin-shop-list">
            {shopProducts.map((product) => {
              const mediaKey = `shop.${product.id}.image`;
              const image =
                shop.find((item) => item.id === product.id)?.image ||
                mediaByKey[mediaKey]?.url ||
                `/assets/${product.image}`;
              return (
                <article className="admin-shop-card" key={product.id}>
                  <img src={image} alt={product.name.pt} />
                  <div>
                    <h3>{product.name.pt}</h3>
                    <label>
                      Preço em R$
                      <input
                        inputMode="decimal"
                        placeholder="Sob consulta"
                        value={priceDrafts[product.id] ?? ""}
                        onChange={(event) =>
                          setPriceDrafts((current) => ({
                            ...current,
                            [product.id]: event.target.value,
                          }))
                        }
                      />
                    </label>
                    <div className="admin-inline-actions">
                      <button
                        type="button"
                        className="admin-secondary"
                        disabled={busy}
                        onClick={() => saveShopPrice(product.id)}
                      >
                        Salvar preço
                      </button>
                      <label className="admin-file compact">
                        Trocar foto
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                          disabled={busy}
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            void replacePhoto(mediaKey, file);
                            event.target.value = "";
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}
