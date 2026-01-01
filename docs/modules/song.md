# Song Module

Fetch songs by ID or permalink; search, recommendations, trending, and web radio.

## Public Functions

### `getById({ songIds })`

- **What it does:** Fetches one or more songs by Saavn song IDs.
- **Parameters:**
  - `songIds` — required; a single ID string or array of ID strings
- **Example:**

```ts
import { Song } from '@saavn-labs/sdk';

// Single song
const single = await Song.getById({ songIds: '123456' });

// Multiple songs
const many = await Song.getById({ songIds: ['123456', '789012', '345678'] });

console.log(single.title, many.length);
```

### `getByPermalink({ permalink })`

- **What it does:** Fetches a song using a permalink token.
- **Parameters:**
  - `permalink` — required; must resolve to a song token
- **Example:**

```ts
import { Song } from '@saavn-labs/sdk';

const song = await Song.getByPermalink({
  permalink: 'https://www.jiosaavn.com/song/tum-hi-ho/EToxUyFpcwQ',
});

console.log(song.id, song.title);
```

### `getByStationId({ stationId, limit?, next? })`

- **What it does:** Returns songs from a web radio station.
- **Parameters:**
  - `stationId` — required
  - `limit` — optional; defaults to `10`
  - `next` — optional; pass `true` to paginate to the next set
- **Example:**

```ts
import { Song } from '@saavn-labs/sdk';

const songs = await Song.getByStationId({
  stationId: 'station_abcdef',
  limit: 10,
  next: false,
});

console.log(songs[0]?.title);
```

### `getRecommendations({ songId })`

- **What it does:** Returns recommended songs for a given song.
- **Parameters:**
  - `songId` — required
- **Example:**

```ts
import { Song } from '@saavn-labs/sdk';

const recos = await Song.getRecommendations({ songId: '123456' });

console.log(recos.items?.length ?? 0);
```

### `getTrending({ language })`

- **What it does:** Returns trending songs for the given language.
- **Parameters:**
  - `language` — required; e.g., `'hindi'`, `'english'`, `'tamil'`, `'kannada'`
- **Example:**

```ts
import { Song } from '@saavn-labs/sdk';

const trending = await Song.getTrending({ language: 'hindi' });

console.log(trending.items?.slice(0, 5));
```

### `search({ query, limit?, offset? })`

- **What it does:** Searches for songs by query.
- **Parameters:**
  - `query` — required
  - `limit` — optional; defaults to `10`
  - `offset` — optional; defaults to `1`
- **Example:**

```ts
import { Song } from '@saavn-labs/sdk';

const res = await Song.search({
  query: 'lofi',
  limit: 20,
  offset: 1,
});

console.log(`Found ${res.total} songs`);
res.items?.forEach((song) => {
  console.log(song.title, '-', song.subtitle);
});
```

## Experimental

### `experimental.fetchStreamUrls({ encryptedUrl, runtime, acknowledge })`

- **What it does:** Generates direct stream URLs for a song.
- **Parameters:**
  - `encryptedUrl` — required; encrypted media URL from song payload
  - `runtime` — required; `'node' | 'edge'`
  - `acknowledge` — required; must be `true` to confirm use of experimental API
- **Example:**

```ts
import { Song } from '@saavn-labs/sdk';

const urls = await Song.experimental.fetchStreamUrls({
  encryptedUrl: 'AEAD-ENCODED-URL',
  runtime: 'node',
  acknowledge: true,
});

console.log(urls);
```

> Experimental APIs are not guaranteed to be stable; handle errors and fallbacks.
> See [docs/experimental.md](../experimental.md) for details.
