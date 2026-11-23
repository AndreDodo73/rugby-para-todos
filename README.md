# Instituto Rugby Para Todos

Site institucional novo do [Instituto Rugby Para Todos](https://www.rugbyparatodos.org.br/).

**Este repositório é independente do FORGEE / Projetoworkshop.**  
Caminho canônico: `/agent/repos/rugby-para-todos`

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · pnpm · Supabase

```bash
cd /agent/repos/rugby-para-todos
pnpm install --frozen-lockfile
pnpm dev
```

Abre em http://localhost:5174. Painel: http://localhost:5174/admin

## Painel (textos e fotos)

- Produção: https://rugby-para-todos.vercel.app/admin
- Login com e-mail e senha (Supabase Auth, projeto `hkjuivqptgzpzvdzkuwg`)
- O site público lê textos e fotos das tabelas `site_texts`, `site_media` e `shop_products`
- Preços da loja só aparecem quando preenchidos no painel; em branco ficam como “Sob consulta”

Variáveis (já na Vercel):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Estrutura

```
src/
  App.tsx                 # página principal
  admin/                  # painel em português
  components/             # Hero, seções institucionais, animação
  content/                # textos oficiais + catálogo CMS
  lib/                    # supabase + cms
  styles/                 # fonts.css, theme.css
public/
  assets/                 # imagens e SVGs (hashes do Make)
  media/                  # hero-rugby.mp4 + poster
  fonts/                  # Hind + Montserrat (OFL)
docs/                     # notas e referências de handoff
guidelines/               # Guidelines.md (continuidade Cursor)
```

## Documentos de handoff (Make)

- `AGENTS.md` · `CLAUDE.md` · `design-system.md` · `ATTRIBUTIONS.md`
- `guidelines/Guidelines.md`
- `MISSING-ASSETS.md` — o que ainda depende de export do Make

## O que este site não fecha

- Pagamentos: só abre PayPal / Catarse oficiais (sem confirmação local)
- Loja: pedido por WhatsApp (preço só se confirmado no painel)
- Newsletter: abre formulário oficial externo
- Sem inventar números, depoimentos ou logos sem origem

## Preview

Com o `pnpm dev` no ar, um tunnel Cloudflare temporário pode expor a porta 5174.
