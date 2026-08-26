<!-- ══════════════════════════ PORTADA ══════════════════════════ -->
<div align="center">
  <img src="docs/title-banner.svg" width="100%" alt="Collections Dashboard"/>
</div>

<!-- ══════════════════════ IDIOMAS / LANGUAGES ══════════════════════ -->
<div align="center">
<a href="README.md"><img src="https://img.shields.io/badge/Português-555555?style=for-the-badge" alt="Português"/></a>
<a href="README.en.md"><img src="https://img.shields.io/badge/English-555555?style=for-the-badge" alt="English"/></a>
<a href="README.es.md"><img src="https://img.shields.io/badge/Español-1987F0?style=for-the-badge" alt="Español"/></a>
</div>

<h1 align="center">Collections Dashboard</h1>
<p align="center"><em>Dashboard de cuentas por cobrar para distribuidoras — el frontend de la Collections API</em></p>
<p align="center"><strong>Datos (demo o API real) → métricas → clientes/facturas → matching de remesas</strong></p>

<div align="center">
<img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="nextjs"/>
<img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="react"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="ts"/>
<img src="https://img.shields.io/badge/License-MIT-2E7D32?style=flat-square" alt="license"/>
</div>

<div align="center">
<a href="#acerca-de"><img src="https://img.shields.io/badge/▸_ACERCA_DE-1987F0?style=for-the-badge" alt="acerca"/></a>
<a href="#funcionalidades"><img src="https://img.shields.io/badge/▸_FUNCIONALIDADES-000000?style=for-the-badge" alt="func"/></a>
<a href="#tecnologías"><img src="https://img.shields.io/badge/▸_TECNOLOGÍAS-1987F0?style=for-the-badge" alt="tech"/></a>
<a href="#uso"><img src="https://img.shields.io/badge/▸_USO-000000?style=for-the-badge" alt="uso"/></a>
</div>

<br/>

> 💡 **Funciona solo.** Viene con datos de demo integrados (route handlers de Next.js) — apunta `NEXT_PUBLIC_API_URL` a la API Rails real cuando quieras.

<div align="center">
  <img src="docs/screenshot.png" width="100%" alt="Collections Dashboard — cuentas por cobrar"/>
</div>

## Acerca de

**Collections Dashboard** es un dashboard limpio de cuentas por cobrar (AR) para distribuidoras — el frontend complementario de la [Collections API](https://github.com/geoggrigori/collections-api) (Ruby on Rails). Funciona totalmente solo (datos de demo integrados + route handlers de Next.js), y puede apuntar a la API Rails real configurando `NEXT_PUBLIC_API_URL`.

## Funcionalidades

- **Métricas de AR** — cuentas por cobrar abiertas, exposición vencida, clientes, cobrado.
- **Tablas de clientes y facturas** con badges de estado y resaltado de atraso.
- **Demo de matching de remesas** — pega una nota de pago en texto libre y observa cómo se asocia a las facturas abiertas del cliente (en la API real esto lo hace un LLM; esta demo usa la misma heurística determinística que usa la API como fallback).
- **API integrada** — `/api/customers`, `/api/invoices`, `/api/metrics`, `/api/remittances/match` (route handlers), así que funciona en Vercel sin backend.

## Tecnologías

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS |
| Lenguaje | TypeScript |
| Hosting | Vercel |

## Uso

```bash
npm install
npm run dev      # http://localhost:3000
```

Para conectar a la API real en vez de los datos de demo:
```bash
NEXT_PUBLIC_API_URL=https://tu-collections-api.example.com
```

**Estructura:**
```
src/
  app/
    page.tsx                 # dashboard (server component)
    api/                     # route handlers (customers, invoices, metrics, match)
  components/                # MetricCard, StatusBadge, RemittanceDemo
  lib/                       # types, datos de demo, helpers de formato
```

## Licencia

[MIT](LICENSE).

<div align="center">
  <img src="https://file.loading.io/color/feature/thumb/Blues-8.png?" width="100%" height="10px" alt="divider"/>
</div>

<p align="center"><sub>Desarrollado por <strong><a href="https://github.com/geoggrigori">Grigori</a></strong> · 2026</sub></p>
