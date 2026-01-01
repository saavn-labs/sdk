# Album Module

Fetch albums by ID or permalink; search, get recommendations and trending.

## Public Functions

### `getById({ albumId })`

- **What it does:** Fetches an album by Saavn album ID.
- **Parameters:**
  - `albumId` — required
- **Example:**

```ts
import { Album } from '@saavn-labs/sdk';

const album = await Album.getById({ albumId: '123456' });

console.log(album.title);
```

### `getByPermalink({ permalink })`

- **What it does:** Fetches an album using a permalink token.
- **Parameters:**
  - `permalink` — required; must resolve to an album token
- **Example:**

```ts
import { Album } from '@saavn-labs/sdk';

const album = await Album.getByPermalink({
  permalink: 'https://www.jiosaavn.com/album/lofi-sessions/YOUR_TOKEN',
});

console.log(album.id);
```

### `getRecommendations({ albumId })`

- **What it does:** Returns recommended albums for a given album.
- **Parameters:**
  - `albumId` — required
- **Example:**

```ts
import { Album } from '@saavn-labs/sdk';

const recos = await Album.getRecommendations({ albumId: '123456' });

console.log(recos.items?.length ?? 0);
```

### `getTrending({ language })`

- **What it does:** Returns trending albums for the given language.
- **Parameters:**
  - `language` — required; e.g., `'hindi'`, `'english'`, `'tamil'`, `'kannada'`
- **Example:**

```ts
import { Album } from '@saavn-labs/sdk';

const trending = await Album.getTrending({ language: 'hindi' });

console.log(trending.items?.slice(0, 5));
```

### `search({ query, limit?, offset? })`

- **What it does:** Searches for albums by query.
- **Parameters:**
  - `query` — required
  - `limit` — optional; defaults to `10`
  - `offset` — optional; defaults to `1`
- **Example:**

```ts
import { Album } from '@saavn-labs/sdk';

const res = await Album.search({
  query: 'lofi',
  limit: 20,
  offset: 1,
});

console.log(res.items?.map((a) => a.title));
```
