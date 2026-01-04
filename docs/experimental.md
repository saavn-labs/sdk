# Experimental APIs

Certain features are exposed as experimental and may change or stop working without notice. These APIs are **opt-in**, **unstable**, and **disabled by default**. They require explicit acknowledgment to call.

---

## ⚠️ `Song.experimental.fetchStreamUrls(encryptedUrl, runtime, acknowledge)`

⚠️ **This method uses positional arguments, not an options object.**
Passing an object will not work.

Generates direct stream URLs for a song. Behavior depends on runtime:

* `node`: Local DES-ECB decryption using Node.js crypto
* `edge`: Calls an undocumented internal Saavn API

---

## Signature

```ts
fetchStreamUrls(
  encryptedUrl: string,
  runtime: 'node' | 'edge',
  acknowledge: true
): Promise<Array<{ bitrate: string; url: string }>>
```

---

## Parameters

* **`encryptedUrl`** (required)

  * Encrypted media URL from the song payload.

* **`runtime`** (required)

  * `'node' | 'edge'`
  * Must be specified explicitly.

* **`acknowledge`** (required)

  * **Must be `true`.**
  * If not `true`, the SDK will throw `EXPERIMENTAL_FEATURE`.

---

## Example (copy-paste safe)

```ts
import { Song } from '@saavn-labs/sdk';

async function example() {
  const encryptedUrl = 'AEAD-ENCODED-URL-FROM-SONG-PAYLOAD';

  const urls = await Song.experimental.fetchStreamUrls(
    encryptedUrl,
    'node',
    true, // explicit acknowledgment is mandatory
  );

  console.log(urls);
}

example();
```

---

## Caveats

* Experimental APIs are **not guaranteed to be stable**.
* Upstream provider behavior may change without notice.
* Always handle errors and provide fallbacks.
* Do not rely on this API for critical or production workloads unless you accept the risks.
