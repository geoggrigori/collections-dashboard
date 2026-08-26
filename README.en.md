<!-- ══════════════════════════ TITLE ══════════════════════════ -->
<div align="center">
  <img src="docs/title-banner.svg" width="100%" alt="Collections Dashboard"/>
</div>

<!-- ══════════════════════ IDIOMAS / LANGUAGES ══════════════════════ -->
<div align="center">
<a href="README.md"><img src="https://img.shields.io/badge/Português-555555?style=for-the-badge" alt="Português"/></a>
<a href="README.en.md"><img src="https://img.shields.io/badge/English-1987F0?style=for-the-badge" alt="English"/></a>
<a href="README.es.md"><img src="https://img.shields.io/badge/Español-555555?style=for-the-badge" alt="Español"/></a>
</div>

<h1 align="center">Collections Dashboard</h1>
<p align="center"><em>An accounts-receivable dashboard for distributors — the front-end for the Collections API</em></p>
<p align="center"><strong>Data (demo or live API) → metrics → customers/invoices → remittance matching</strong></p>

<div align="center">
<img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="nextjs"/>
<img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="react"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="ts"/>
<img src="https://img.shields.io/badge/License-MIT-2E7D32?style=flat-square" alt="license"/>
</div>

<div align="center">
<a href="#about"><img src="https://img.shields.io/badge/▸_ABOUT-1987F0?style=for-the-badge" alt="about"/></a>
<a href="#features"><img src="https://img.shields.io/badge/▸_FEATURES-000000?style=for-the-badge" alt="features"/></a>
<a href="#tech-stack"><img src="https://img.shields.io/badge/▸_TECH_STACK-1987F0?style=for-the-badge" alt="tech"/></a>
<a href="#usage"><img src="https://img.shields.io/badge/▸_USAGE-000000?style=for-the-badge" alt="usage"/></a>
</div>

<br/>

> 💡 **Runs standalone.** Ships with bundled demo data (Next.js route handlers) — point `NEXT_PUBLIC_API_URL` at the real Rails API whenever you want.

<div align="center">
  <img src="docs/screenshot.png" width="100%" alt="Collections Dashboard — accounts receivable"/>
</div>

## About

**Collections Dashboard** is a clean accounts-receivable dashboard for distributors — the front-end companion to the [Collections API](https://github.com/geoggrigori/collections-api) (Ruby on Rails). It runs fully standalone (bundled demo data + Next.js route handlers), and can point at the live Rails API by setting `NEXT_PUBLIC_API_URL`.

## Features

- **AR metrics** — open receivables, overdue exposure, customers, collected.
- **Customers & invoices** tables with status badges and overdue highlighting.
- **Remittance matching demo** — paste a free-text payment note and watch it get matched to the customer's open invoices (an LLM does this in the API; this demo uses the same deterministic heuristic the API falls back to).
- **Built-in API** — `/api/customers`, `/api/invoices`, `/api/metrics`, `/api/remittances/match` (route handlers), so it works on Vercel with no backend.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS |
| Language | TypeScript |
| Hosting | Vercel |

## Usage

```bash
npm install
npm run dev      # http://localhost:3000
```

To connect the real API instead of the bundled demo data:
```bash
NEXT_PUBLIC_API_URL=https://your-collections-api.example.com
```

**Structure:**
```
src/
  app/
    page.tsx                 # dashboard (server component)
    api/                     # route handlers (customers, invoices, metrics, match)
  components/                # MetricCard, StatusBadge, RemittanceDemo
  lib/                       # types, demo data, formatting helpers
```

## License

[MIT](LICENSE).

<div align="center">
  <img src="https://file.loading.io/color/feature/thumb/Blues-8.png?" width="100%" height="10px" alt="divider"/>
</div>

<p align="center"><sub>Built by <strong><a href="https://github.com/geoggrigori">Grigori</a></strong> · 2026</sub></p>
