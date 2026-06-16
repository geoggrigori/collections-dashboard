# Collections Dashboard

A clean accounts-receivable dashboard for distributors — the front-end companion
to the [Collections API](https://github.com/geoggrigori/collections-api) (Ruby on
Rails). Built with **Next.js 16, React 19, TypeScript and Tailwind CSS**.

It runs fully standalone (bundled demo data + Next.js route handlers), and can
point at the live Rails API by setting `NEXT_PUBLIC_API_URL`.

## Features

- **AR metrics** — open receivables, overdue exposure, customers, collected.
- **Customers & invoices** tables with status badges and overdue highlighting.
- **Remittance matching demo** — paste a free-text payment note and watch it get
  matched to the customer's open invoices (an LLM does this in the API; this demo
  uses the same deterministic heuristic the API falls back to).
- **Built-in API** — `/api/customers`, `/api/invoices`, `/api/metrics`,
  `/api/remittances/match` (route handlers), so it works on Vercel with no
  backend.

## Tech stack

| Concern    | Choice                         |
| ---------- | ------------------------------ |
| Framework  | Next.js 16 (App Router)        |
| UI         | React 19, Tailwind CSS         |
| Language   | TypeScript                     |
| Hosting    | Vercel                         |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

To connect the real API instead of the bundled demo data, set:

```bash
NEXT_PUBLIC_API_URL=https://your-collections-api.example.com
```

## Project structure

```
src/
  app/
    page.tsx                 # dashboard (server component)
    api/                     # route handlers (customers, invoices, metrics, match)
  components/                # MetricCard, StatusBadge, RemittanceDemo
  lib/                       # types, demo data, formatting helpers
```

## License

MIT
