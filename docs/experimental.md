# Experimental APIs

Certain features are exposed as experimental and may change or stop working without notice. These require explicit acknowledgment to call.

## `Song.experimental.fetchStreamUrls({ encryptedUrl, runtime, acknowledge })`

Generates direct stream URLs for a song. Behavior depends on runtime:

- `node`: local DES-ECB decryption using Node's crypto
- `edge`: calls an undocumented Saavn internal API

### Signature

```ts
fetchStreamUrls({
  encryptedUrl: string,
  runtime: 'node' | 'edge',
  acknowledge: boolean
}): Promise<Array<{ bitrate: string; url: string }>>
```

### Parameters

- `encryptedUrl` (required): Encrypted media URL from the song payload.
- `runtime` (required): `'node' | 'edge'` — choose the environment.
- `acknowledge` (required): Must be `true` to confirm use of an experimental API.

### Example

```ts
import { Song } from '@saavn-labs/sdk';

async function example() {
  const encryptedUrl = 'AEAD-ENCODED-URL-FROM-SONG-PAYLOAD';

  const urls = await Song.experimental.fetchStreamUrls({
    encryptedUrl,
    runtime: 'node',
    acknowledge: true,
  });

  console.log(urls);
}

example();
```

### Caveats

- Experimental APIs are not guaranteed to be stable.
- Upstream behavior may change; handle errors and fall back where necessary.
- Use only when you accept the risks of non-guaranteed availability.