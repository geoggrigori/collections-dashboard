<!-- ══════════════════════════ TÍTULO ══════════════════════════ -->
<div align="center">
  <img src="docs/title-banner.svg" width="100%" alt="Collections Dashboard"/>
</div>

<!-- ══════════════════════ IDIOMAS / LANGUAGES ══════════════════════ -->
<div align="center">
<a href="README.md"><img src="https://img.shields.io/badge/Português-1987F0?style=for-the-badge" alt="Português"/></a>
<a href="README.en.md"><img src="https://img.shields.io/badge/English-555555?style=for-the-badge" alt="English"/></a>
<a href="README.es.md"><img src="https://img.shields.io/badge/Español-555555?style=for-the-badge" alt="Español"/></a>
</div>

<h1 align="center">Collections Dashboard</h1>
<p align="center"><em>Dashboard de contas a receber para distribuidoras — front-end da Collections API</em></p>
<p align="center"><strong>Dados (demo ou API real) → métricas → clientes/faturas → matching de remessa</strong></p>

<div align="center">
<img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="nextjs"/>
<img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="react"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="ts"/>
<img src="https://img.shields.io/badge/License-MIT-2E7D32?style=flat-square" alt="license"/>
</div>

<div align="center">
<a href="#sobre"><img src="https://img.shields.io/badge/▸_SOBRE-1987F0?style=for-the-badge" alt="sobre"/></a>
<a href="#funcionalidades"><img src="https://img.shields.io/badge/▸_FUNCIONALIDADES-000000?style=for-the-badge" alt="func"/></a>
<a href="#tecnologias"><img src="https://img.shields.io/badge/▸_TECNOLOGIAS-1987F0?style=for-the-badge" alt="tech"/></a>
<a href="#uso"><img src="https://img.shields.io/badge/▸_USO-000000?style=for-the-badge" alt="uso"/></a>
</div>

<br/>

> 💡 **Roda sozinho.** Vem com dados de demo embutidos (route handlers do Next.js) — aponte `NEXT_PUBLIC_API_URL` pra a API Rails real quando quiser.

<div align="center">
  <img src="docs/screenshot.png" width="100%" alt="Collections Dashboard — contas a receber"/>
</div>

## Sobre

**Collections Dashboard** é um dashboard limpo de contas a receber (AR) para distribuidoras — o front-end complementar da [Collections API](https://github.com/geoggrigori/collections-api) (Ruby on Rails). Roda totalmente sozinho (dados de demo embutidos + route handlers do Next.js), e pode apontar para a API Rails real via `NEXT_PUBLIC_API_URL`.

## Funcionalidades

- **Métricas de AR** — recebíveis em aberto, exposição vencida, clientes, valor recebido.
- **Tabelas de clientes e faturas** com badges de status e destaque de atraso.
- **Demo de matching de remessa** — cole uma nota de pagamento em texto livre e veja ela sendo associada às faturas em aberto do cliente (na API real quem faz isso é um LLM; essa demo usa a mesma heurística determinística que a API usa como fallback).
- **API embutida** — `/api/customers`, `/api/invoices`, `/api/metrics`, `/api/remittances/match` (route handlers), então funciona na Vercel sem backend.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS |
| Linguagem | TypeScript |
| Hosting | Vercel |

## Uso

```bash
npm install
npm run dev      # http://localhost:3000
```

Pra conectar à API real em vez dos dados de demo:
```bash
NEXT_PUBLIC_API_URL=https://sua-collections-api.exemplo.com
```

**Estrutura:**
```
src/
  app/
    page.tsx                 # dashboard (server component)
    api/                     # route handlers (customers, invoices, metrics, match)
  components/                # MetricCard, StatusBadge, RemittanceDemo
  lib/                       # types, dados de demo, helpers de formatação
```

## Licença

[MIT](LICENSE).

<div align="center">
  <img src="https://file.loading.io/color/feature/thumb/Blues-8.png?" width="100%" height="10px" alt="divider"/>
</div>

<p align="center"><sub>Desenvolvido por <strong><a href="https://github.com/geoggrigori">Grigori</a></strong> · 2026</sub></p>
