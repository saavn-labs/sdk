## SDK Overview

This repository provides a **type-safe TypeScript SDK** for interacting with JioSaavn’s native (undocumented) API.

The SDK emphasizes:

- Explicit inputs
- Predictable, normalized outputs
- Stable return shapes
- Clear separation between public SDK APIs and internal Saavn operations

It exposes **high-level modules** that map closely to Saavn entities while abstracting away transport details, response inconsistencies, and schema validation.

---

## Modules

The SDK exposes the following modules:

- **Artist**
  Fetch artists by ID or permalink, and search artists.

- **Album**
  Fetch albums, search, get recommendations, and retrieve trending albums.

- **Song**
  Fetch songs, search, get recommendations, trending songs, and web radio songs.

- **Playlist**
  Fetch playlists, search, get recommendations, and retrieve trending playlists.

- **Extras**
  Cross-entity search, global trending, and station creation helpers.

Each module exposes **only stable, SDK-level functions**.
Raw Saavn endpoints and schemas are not part of the public API.

---

## Basic Usage

**All module methods accept object-based parameters for type safety and clarity:**

```ts
import { Artist, Album, Song, Playlist, Extras } from '@saavn-labs/sdk';

async function demo() {
  const artist = await Artist.getById({ artistId: '123456' });
  const albums = await Album.search({ query: 'lofi', limit: 5 });
  const songs = await Song.search({ query: 'ambient', limit: 10 });
  const playlist = await Playlist.getById({ playlistId: '987654' });
  const all = await Extras.searchAll({ query: 'bollywood' });

  console.log({
    artist: artist.id,
    albums: albums.items?.length ?? 0,
    songs: songs.items?.length ?? 0,
    playlist: playlist.id,
    all: all.items?.length ?? 0,
  });
}

demo();
```

**Why object parameters?**

- Type-safe and autocomplete-friendly
- Makes parameter intent explicit
- Easier to add optional parameters without breaking changes
- Matches modern API design patterns

For detailed examples and a working API server, see [../examples/README.md](../examples/README.md).

---

## Return Shapes

All functions return **normalized SDK models** derived from Saavn responses.

- Response shapes are stable within minor versions.
- Breaking changes occur only in major releases.
- Optional fields may be omitted when Saavn does not provide data.

Consumers should rely on documented SDK fields rather than raw Saavn behavior.

---

## Environment Support

The SDK runs in modern JavaScript runtimes, including:

- Node.js 18+
- Bun
- Deno
- Edge / serverless runtimes

Some **experimental or unsafe APIs** may require explicit runtime selection or user acknowledgment. Refer to module-level documentation for details.

For comprehensive API details, refer to the [modules documentation](./modules/).

For guidance on error handling, see the [error handling guide](./errors.md).

For information about experimental features, consult the [experimental APIs documentation](./experimental.md).
