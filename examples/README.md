# JioSaavn SDK Examples

Production-ready example server demonstrating best practices for SDK usage.

## 🚀 Quick Start

### 1. Build the SDK

```bash
npm run build
# or
bun run build
```

### 2. Start the Example Server

```bash
npm run examples:api
# or
bun run examples:api
```

### 3. Visit in Browser

Open http://localhost:3000

## 📖 Full Documentation

For comprehensive documentation, see:

- **[Main README](../README.md)** — Overview and installation
- **[docs/overview.md](../docs/overview.md)** — Design principles and architecture
- **[docs/errors.md](../docs/errors.md)** — Error handling guide
- **[docs/modules/](../docs/modules/)** — Module-level API documentation
  - [Album Module](../docs/modules/album.md)
  - [Artist Module](../docs/modules/artist.md)
  - [Song Module](../docs/modules/track.md)
  - [Playlist Module](../docs/modules/playlist.md)
  - [Extras Module](../docs/modules/extras.md)

## ✅ Usage Patterns

All SDK methods accept **object-based parameters** for type safety and clarity:

```typescript
import { Album, Song, Artist, Playlist, Extras } from '@saavn-labs/sdk';

// Fetch by ID
await Album.getById({ albumId: '123' });
await Song.getById({ songIds: 'abc' });
await Song.getById({ songIds: ['abc', 'def', 'ghi'] });

// Search
await Album.search({ query: 'lofi', limit: 10, offset: 1 });
await Artist.search({ query: 'arijit', limit: 5 });

// Fetch by Permalink
await Album.getByPermalink({ permalink: 'https://www.jiosaavn.com/...' });
await Song.getByPermalink({ permalink: 'https://www.jiosaavn.com/...' });

// Trending
await Song.getTrending({ language: 'hindi' });
await Album.getTrending({ language: 'english' });
await Playlist.getTrending({ language: 'tamil' });

// Recommendations
await Album.getRecommendations({ albumId: '123' });
await Song.getRecommendations({ songId: 'abc' });
await Playlist.getRecommendations({ playlistId: 'xyz' });

// Utilities
await Extras.searchAll({ query: 'rahman' });
await Extras.getTrendingAll();
await Extras.createEntityStation({ songIds: ['id1', 'id2', 'id3'] });
await Extras.createFeaturedStation({ language: 'hindi', name: 'Chill' });

// Error handling
try {
  const album = await Album.getById({ albumId: 'invalid' });
} catch (error) {
  if (error instanceof SDKError) {
    console.error(`${error.code}: ${error.message}`);
  }
}
```

See [docs/errors.md](../docs/errors.md) for complete error handling guide.

## 📖 Detailed Module Reference

For detailed examples and API documentation for each module, visit:

- **[Album Module](../docs/modules/album.md)** — Get, search, trending, recommendations
- **[Artist Module](../docs/modules/artist.md)** — Get, search
- **[Song Module](../docs/modules/track.md)** — Get, search, station, streaming
- **[Playlist Module](../docs/modules/playlist.md)** — Get, search, trending, recommendations
- **[Extras Module](../docs/modules/extras.md)** — Cross-entity search, stations

## 🛠️ Error Handling

All errors are typed through `SDKError`. See [docs/errors.md](../docs/errors.md) for all error codes:

```typescript
import { SDKError } from '@saavn-labs/sdk';

try {
  const album = await Album.getById({ albumId: 'invalid' });
} catch (error) {
  if (error instanceof SDKError) {
    switch (error.code) {
      case 'INVALID_PARAMS':
        console.error('Bad parameters:', error.message);
        break;
      case 'NETWORK_ERROR':
        console.error('Network issue:', error.message);
        break;
      case 'API_ERROR':
        console.error('Upstream error:', error.message);
        break;
      default:
        throw error;
    }
  }
}
```

## 📡 API Server Response Format

All responses include metadata for debugging and monitoring:

### Success Response

```json
{
  "success": true,
  "method": "Album.getById",
  "params": { "albumId": "123" },
  "data": {
    "id": "123",
    "title": "Album Title",
    "artist": "Artist Name"
  },
  "meta": {
    "timestamp": "2026-01-01T12:00:00.000Z",
    "duration": "145ms",
    "sdk": "JioSaavn SDK"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "name": "SDKError",
    "code": "INVALID_PARAMS",
    "message": "Invalid album ID provided",
    "details": {}
  },
  "meta": {
    "timestamp": "2026-01-01T12:00:00.000Z",
    "duration": "12ms"
  }
}
```

## Testing

Using curl:

```bash
# Get album by ID
curl "http://localhost:3000/api/test?method=Album.getById&albumId=123"

# Search songs
curl "http://localhost:3000/api/test?method=Song.search&query=test&limit=5"

# Get trending songs
curl "http://localhost:3000/api/test?method=Song.getTrending&language=hindi"

# Search all content
curl "http://localhost:3000/api/test?method=Extras.searchAll&query=arijit"

# Get artist by permalink
curl "http://localhost:3000/api/test?method=Artist.getByPermalink&permalink=arijit-singh"

# Get playlist recommendations
curl "http://localhost:3000/api/test?method=Playlist.getRecommendations&playlistId=789"

# Get songs from station
curl "http://localhost:3000/api/test?method=Song.getByStationId&stationId=abc&limit=10"

# Create entity station (comma-separated song IDs)
curl "http://localhost:3000/api/test?method=Extras.createEntityStation&songIds=id1,id2,id3"
```

Using the browser interface:

```
http://localhost:3000
```

## Notes

- All methods support TypeScript autocomplete
- Optional parameters have sensible defaults
- Server logs all requests for debugging
- Response times included in metadata
