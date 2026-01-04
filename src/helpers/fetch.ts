/**
 * Fetch utility for @saavn-labs/sdk
 * @module fetch
 * @internal
 */

import { pickUserAgent } from './utils.js';

/**
 * API context/environment to use for requests
 * - 'web6dot0': Web context
 * - 'android': Android context
 */
export type ClientContext = 'web6dot0' | 'android';

/**
 * Parameters for making an API request to JioSaavn
 */
export interface FetchParams {
  /** API call to op (e.g., 'song.getDetails') */
  call: string;
  /** Query parameters for the API call */
  params?: Record<string, string | number | boolean>;
  /** API context to use (default: 'web6dot0') */
  context?: ClientContext;
  /** Base URL for the JioSaavn API (e.g. your own proxy) */
  baseUrl?: string;
  /** Custom HTTP headers to include in request */
  headers?: Record<string, string>;
  /** Custom User-Agent strings to rotate from (optional) */
  userAgents?: string[];
  /** Custom fetch implementation (e.g., for environments without global fetch) */
  fetch?: typeof fetch;
  /** Optional timeout in milliseconds */
  timeoutMs?: number;
}

const BASE_URL = 'https://www.jiosaavn.com';

export interface FetchResponse {
  data: unknown;
  ok: boolean;
  status: number;
}

export const fetchFromSaavn = async ({
  call,
  params = {},
  context = 'web6dot0',
  baseUrl = BASE_URL,
  headers = {},
  userAgents,
  timeoutMs,
  fetch: fetchImpl = globalThis.fetch,
}: FetchParams): Promise<FetchResponse> => {
  const url = new URL(`${baseUrl}/api.php`);

  url.searchParams.append('__call', call);
  url.searchParams.append('_format', 'json');
  url.searchParams.append('_marker', '0');
  url.searchParams.append('api_version', '4');
  url.searchParams.append('ctx', context);

  for (const [k, v] of Object.entries(params)) {
    url.searchParams.append(k, String(v));
  }

  const controller = timeoutMs ? new AbortController() : undefined;
  const timer = timeoutMs
    ? setTimeout(() => controller?.abort(), timeoutMs)
    : undefined;

  try {
    const res = await fetchImpl(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': pickUserAgent(userAgents),
        ...headers,
      },
      signal: controller?.signal,
    });

    const data = await res.json();

    return { data, ok: res.ok, status: res.status };
  } finally {
    if (timer) clearTimeout(timer);
  }
};
