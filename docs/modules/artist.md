# Artist Module

Fetch and search artists using Saavn identifiers or permalinks.

## Public Functions

### `getById({ artistId })`

- **What it does:** Fetches an artist by Saavn artist ID.
- **Parameters:**
  - `artistId` — required
- **Example:**

```ts
import { Artist } from '@saavn-labs/sdk';

const artist = await Artist.getById({ artistId: '123456' });

console.log(artist.name);
```

### `getByPermalink({ permalink })`

- **What it does:** Fetches an artist using a permalink token.
- **Parameters:**
  - `permalink` — required; must resolve to an artist token
- **Example:**

```ts
import { Artist } from '@saavn-labs/sdk';

const artist = await Artist.getByPermalink({
  permalink: 'https://www.jiosaavn.com/artist/arijit-singh/YOUR_TOKEN',
});

console.log(artist.id);
```

### `search({ query, limit?, offset? })`

- **What it does:** Searches for artists by query.
- **Parameters:**
  - `query` — required
  - `limit` — optional; defaults to `10`
  - `offset` — optional; defaults to `1`
- **Example:**

```ts
import { Artist } from '@saavn-labs/sdk';

const res = await Artist.search({
  query: 'arijit',
  limit: 10,
  offset: 1,
});

console.log(`Found ${res.total} artists`);
res.results.forEach((a) => {
  console.log(a.name);
});
```
