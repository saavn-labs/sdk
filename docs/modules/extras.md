# Extras Module

Cross-entity utilities: search across all entities, trending across all, and station creation.

## Public Functions

### `searchAll({ query })`

- **What it does:** Searches across all supported entities.
- **Parameters:**
  - `query` — required
- **Example:**

```ts
import { Extras } from '@saavn-labs/sdk';

const res = await Extras.searchAll({ query: 'bollywood' });

console.log({
  albums: res.albums.data.length,
  artists: res.artists.data.length,
  songs: res.songs.data.length,
  playlists: res.playlists.data.length,
});
```

### `getTrendingAll()`

- **What it does:** Returns trending entities across categories.
- **Parameters:**
  - none
- **Example:**

```ts
import { Extras } from '@saavn-labs/sdk';

const res = await Extras.getTrendingAll();

console.log(res.slice(0, 5).map((item) => ({ type: item.type, title: item.title })));
```

### `createEntityStation({ songIds })`

- **What it does:** Creates a radio station from a set of song IDs.
- **Parameters:**
  - `songIds` — required; non-empty array of song IDs
- **Example:**

```ts
import { Extras } from '@saavn-labs/sdk';

const station = await Extras.createEntityStation({
  songIds: ['123', '456', '789'],
});

console.log(station.stationid);
```

### `createFeaturedStation({ language, name })`

- **What it does:** Creates a featured station by language and name.
- **Parameters:**
  - `language` — required
  - `name` — required
- **Example:**

```ts
import { Extras } from '@saavn-labs/sdk';

const station = await Extras.createFeaturedStation({
  language: 'hindi',
  name: 'Chill',
});

console.log(station.stationid);
```
