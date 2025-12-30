# @saavn-labs/sdk

A low-level, type-safe TypeScript SDK over **JioSaavn’s native API**, built for developers who want **full control, predictable contracts, and long-term stability**.

[![npm version](https://img.shields.io/npm/v/@saavn-labs/sdk?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@saavn-labs/sdk)
[![downloads](https://img.shields.io/npm/dm/@saavn-labs/sdk?style=for-the-badge)](https://www.npmjs.com/package/@saavn-labs/sdk)
[![license](https://img.shields.io/npm/l/@saavn-labs/sdk?style=for-the-badge)](./LICENSE)

**This is not a product API. This is the foundation everything else is built on.**

This SDK mirrors Saavn’s native operations at the boundary, while exposing stable, domain-level outputs to consumers.

---

## Why This Exists

Most existing JioSaavn libraries try to be helpful and end up **fragile** over time.

**They:**

- Hide real endpoints behind opinionated helpers
- Partially normalize data and silently drop fields
- Break when upstream responses change
- Offer little or no runtime validation

**This SDK takes a different path:**

- **Endpoint-first at the integration boundary** — calls and params map directly to Saavn endpoints
- **Schema-driven** — responses are validated with Zod, not guessed
- **Domain-oriented outputs** — raw payloads are bridged to stable SDK entities instead of leaky, ad-hoc shapes
- **Power-preserving** — nothing is stripped or hidden unless intentionally normalized

This package is the **single source of truth** for interacting with JioSaavn’s native API in a safe, explicit, and future-proof way.

---

## What This SDK Guarantees

### Input Stability

- Parameters map **1:1** to JioSaavn's native API
- No silent rewrites
- No hidden defaults

**If an endpoint accepts a parameter, you control it.**

### Output Stability

- Every response is validated with **Zod**
- Data types are normalized where it matters (numbers, booleans, arrays)
- Keys and shapes are predictable

**Once published, output shapes only change in a major version.**

### Freedom

- Call any supported endpoint directly
- Access the full response, not a trimmed model
- Use the request layer to hit native endpoints even before first-class SDK support exists

---

## Design Principles

1. **SDK, not client** — You compose workflows; the SDK exposes primitives
2. **Validation before convenience** — Runtime safety comes first
3. **No over-normalization** — Real upstream data with minimal transformation
4. **Operation-aware** — Built around how Saavn actually works
5. **Boundary clarity** — Endpoint-first at ingress, domain-oriented at the SDK surface

---

## Architecture

```
@saavn-labs/sdk
├── saavn        # ODD: Native Saavn operations, params, and raw response schemas
├── core         # DDD: Stable SDK entities, primitives, and modules
├── mappers      # Bridges from Saavn responses to domain entities
├── transport    # Request lifecycle, fetch utilities, and user-agent rotation
└── types        # Public TypeScript types and endpoint contracts
```

- **`saavn/` (Operations-Driven Design)** mirrors JioSaavn’s native calls (`call`, `params`, `response`) and stays close to upstream payloads.
- **`core/` (Domain-Driven Design)** is the long-lived surface for consumers; shapes change only in majors.
- **`mappers/`** connect raw Saavn responses to domain entities when normalization is needed.
- **`transport/`** provides the thin HTTP layer (`fetchFromSaavn`) with context selection, UA rotation, and timeouts.

### Operations currently modeled (0.x)

- `get-details` (song, album, artist, playlist, top albums of the year, top searches)
- `get-reco` (album, playlist, song)
- `get-trending` (all, albums, playlists, songs)
- `search-results`
- `web-api`
- `web-radio`

Each operation ships Zod schemas for both parameters and raw responses, validated against recorded Postman fixtures in `tests/postman/collections`.

---

## Installation

```bash
# npm
npm install @saavn-labs/sdk

# pnpm
pnpm add @saavn-labs/sdk

# yarn
yarn add @saavn-labs/sdk

# bun
bun add @saavn-labs/sdk
```

---

## Runtime Support

Works everywhere modern JavaScript runs:

- **Node.js** 18+
- **Bun**
- **Deno**
- **Cloudflare Workers**
- **Vercel Edge/Serverless Functions**
- **AWS Lambda (Node runtime)**

---

## What This SDK Does NOT Do

- No UI abstractions
- No opinionated feature helpers
- No media hosting or caching
- No promises about upstream API permanence

**It gives you tools, not guardrails.**

---

## Who This Is For

- Backend engineers building music platforms
- Developers working close to Saavn's ecosystem
- Library authors building their own abstractions
- Anyone who needs full, predictable access to the API

**If you want a drop-in music service, this is not it.**

---

## Contributing

Contributions are welcome.

- Keep changes focused and explicit
- Add tests for new operations or schemas
- Avoid introducing opinionated abstractions

Tests currently replay Postman fixtures through Vitest to ensure param/response schemas stay in sync with upstream payloads.

---

## Legal Notice

**This is an unofficial SDK.**

- Not affiliated with or endorsed by JioSaavn
- Does not host or redistribute media content
- All data and URLs are fetched from publicly accessible endpoints

**Usage compliance is the sole responsibility of the end user.**

---

## License

**MIT** © 2025 Saavn Labs

See [LICENSE](./LICENSE) for details.

---

Built by **Saavn Labs** with a focus on correctness and longevity.
