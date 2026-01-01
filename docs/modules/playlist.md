# Playlist Module

Fetch playlists by ID or permalink; search, recommendations, and trending.

## Public Functions

### `getById({ playlistId })`

- **What it does:** Fetches a playlist by Saavn playlist ID.
- **Parameters:**
  - `playlistId` — required
- **Example:**

```ts
import { Playlist } from '@saavn-labs/sdk';

const playlist = await Playlist.getById({ playlistId: '123456' });

console.log(playlist.title);
```

### `getByPermalink({ permalink })`

- **What it does:** Fetches a playlist using a permalink token.
- **Parameters:**
  - `permalink` — required; must resolve to a playlist token
- **Example:**

```ts
import { Playlist } from '@saavn-labs/sdk';

const playlist = await Playlist.getByPermalink({
  permalink: 'https://www.jiosaavn.com/playlist/chill-vibes/YOUR_TOKEN',
});

console.log(playlist.id);
```

### `getRecommendations({ playlistId })`

- **What it does:** Returns recommended playlists for a given playlist.
- **Parameters:**
  - `playlistId` — required
- **Example:**

```ts
import { Playlist } from '@saavn-labs/sdk';

const recos = await Playlist.getRecommendations({ playlistId: '123456' });

console.log(recos.items?.length ?? 0);
```

### `getTrending({ language })`

- **What it does:** Returns trending playlists for the given language.
- **Parameters:**
  - `language` — required; e.g., `'hindi'`, `'english'`, `'tamil'`, `'kannada'`
- **Example:**

```ts
import { Playlist } from '@saavn-labs/sdk';

const trending = await Playlist.getTrending({ language: 'hindi' });

console.log(trending.items?.slice(0, 5));
```

### `search({ query, limit?, offset? })`

- **What it does:** Searches for playlists by query.
- **Parameters:**
  - `query` — required
  - `limit` — optional; defaults to `10`
  - `offset` — optional; defaults to `1`
- **Example:**

```ts
import { Playlist } from '@saavn-labs/sdk';

const res = await Playlist.search({
  query: 'chill',
  limit: 20,
  offset: 1,
});

console.log(res.items?.map((p) => p.title));
```
