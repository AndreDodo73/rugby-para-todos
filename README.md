# Instituto Rugby Para Todos

Prévia do site novo. A stack é Vite, React, TypeScript e Tailwind.

```bash
pnpm install
pnpm dev
```

Abre em http://localhost:5174. A raiz redireciona para `/pt`. Inglês e francês ficam em `/en` e `/fr`.

Os textos institucionais foram lidos em [rugbyparatodos.org.br](https://www.rugbyparatodos.org.br/) em 16 de novembro de 2026. O que a página não publica aparece como pendente. Inglês e francês são tradução para revisão editorial.

## Integrações que este repositório não fecha

- Doação: os botões do site atual apontam para Catarse, PayPal e Abrace uma Causa. Este site só liga esses endereços. Não há confirmação de pagamento.
- Loja: o endereço publicado é o Mercado Shops. Não há catálogo, preço nem checkout aqui.
- Contato: o formulário abre o e-mail do aparelho. Não há servidor de envio.
- Newsletter: o formulário do site atual fica em um iframe próprio e não foi reimplementado.
- CMS: projetos, histórias, produtos, documentos, notícias e canais de apoio estão em `src/content/site.ts`, separados dos componentes.
