# Assets ainda faltando (Make → local)

Make: https://www.figma.com/make/cmvZNO2S846IKk0H0PMis2/Modernizar-Site-do-Projeto  
O MCP do Figma **não abre arquivos Make** — precisa exportar assets/código pelo próprio Make (Download) ou colar arquivos aqui.

## Crítico (causa do hero “diferente”)
- `public/media/hero-rugby.mp4` — scroll-scrub. Sem o MP4 o hero fica no still.
- Still atual alinhado ao Make: menino em pé com bola Gilbert / camisa CSN / mural (`hero-rugby-poster.jpg`).
- Antes o poster era outra foto (menino correndo) → hero visualmente errado.

## Logos ainda sem arquivo (faixa Parceiros quebrava)
`2406a.png`, `51872.png`, `680ac.png`, `d2fa6.png`, `a8b5c.png`, `91eb8.png`, `64b7d.png`, `893eb.png`, `9108e.png`, `d51f0.png`  
Enquanto isso a UI só renderiza logos presentes: Outback, Cultura Inglesa, Montana, Einstein.

## Impacto / Paraisópolis
- `54817.png` foi trocado de foto errada (plantio) para crop provisório do frame Make (campo/comunidade). Preferir o PNG original do Make com hash.

## Preferível
Pasta completa `public/assets/` + `public/media/` exportada do Make com nomes hash originais.
