# Errors

The SDK throws `SDKError` for predictable runtime failures. Handle errors using a standard `try/catch` and check the `code` field to branch logic.

## Error Codes

- `INVALID_PARAMS`: Provided parameters are missing or malformed.
- `INVALID_RESPONSE`: Response failed validation against expected schema.
- `API_ERROR`: Upstream returned an error payload or non-success status.
- `NETWORK_ERROR`: Transport failure (timeouts, DNS, non-2xx, etc.).
- `UNSUPPORTED_RUNTIME`: A feature was invoked for an unsupported runtime.
- `EXPERIMENTAL_FEATURE`: An experimental API was called without explicit acknowledgment.
- `INTERNAL_ERROR`: A non-specific internal error occurred.

## Handling

```ts
import { Album, SDKError } from '@saavn-labs/sdk';

async function safeSearch() {
  try {
    const res = await Album.search({ query: 'lofi', limit: 5 });
    return res.results ?? [];
  } catch (err) {
    if (err instanceof SDKError) {
      switch (err.code) {
        case 'INVALID_PARAMS':
          // caller passed bad input
          console.error(`Invalid parameters: ${err.message}`);
          return [];

        case 'NETWORK_ERROR':
          // retry logic or surface connectivity issue
          console.error(`Network error: ${err.message}`);
          return [];

        case 'API_ERROR':
          // upstream Saavn failure
          console.error(`Saavn API error: ${err.message}`);
          return [];

        case 'EXPERIMENTAL_FEATURE':
          // experimental API called without acknowledgment
          console.error(`Experimental API: ${err.message}`);
          return [];

        default:
          // INTERNAL_ERROR / unexpected
          throw err;
      }
    }

    // Non-SDK error: rethrow
    throw err;
  }
}
```

## Notes

- Errors include a human-readable `message` and may include `details` depending on context.
- Validation errors provide field-level information derived from upstream schemas.
- Do not assume stability of upstream endpoints; handle and recover where appropriate.
