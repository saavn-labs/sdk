import { pickUserAgent } from './utils';

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
  /** API operation to call (e.g., 'song.getDetails') */
  operation: string;
  /** Query parameters for the API operation */
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

/**
 * Standardized API response wrapper returned by all fetch operations
 * @template T - Type of the response data
 */
export interface FetchResponse<T> {
  /** The actual response data from JioSaavn API */
  data: T;
  /** Whether the HTTP request was successful (2xx status) */
  ok: boolean;
  /** HTTP status code returned by the server */
  status: number;
}

/**
 * JioSaavn API base URL
 * @internal
 */
const BASE_URL = 'https://www.jiosaavn.com';

/**
 * Makes a request to JioSaavn's API with proper parameter encoding and headers
 *
 * @template T - Type of the response data from the API
 * @param params - Configuration for the API request
 * @returns Promise resolving to standardized API response
 * @throws Network or parsing errors bubble up, must be handled by caller
 *
 * @example
 * const response = await fetchFromSaavn<{ songs: Song[] }>({
 *   operation: 'song.getDetails',
 *   params: { pids: 'song-id-123' }
 * });
 *
 * if (response.ok) {
 *   console.log(response.data.songs);
 * }
 *
 */

export const fetchFromSaavn = async <T = unknown>({
  operation,
  params = {},
  context = 'web6dot0',
  baseUrl = BASE_URL,
  headers = {},
  userAgents,
  timeoutMs,
}: FetchParams): Promise<FetchResponse<T>> => {
  const url = new URL(`${baseUrl}/api.php`);

  url.searchParams.append('__call', operation as string);
  url.searchParams.append('_format', 'json');
  url.searchParams.append('_marker', '0');
  url.searchParams.append('api_version', '4');
  url.searchParams.append('ctx', context);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    url.searchParams.append(key, String(value));
  });

  const controller = timeoutMs ? new AbortController() : undefined;
  const timeout = timeoutMs
    ? setTimeout(() => controller?.abort(), timeoutMs)
    : undefined;

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': pickUserAgent(userAgents),
      ...(headers || {}),
    },
    signal: controller?.signal,
  });

  if (timeout) {
    clearTimeout(timeout);
  }

  const data = await response.json();

  if (data === null || data === undefined) {
    return { data: null as unknown as T, ok: false, status: response.status };
  }

  const dataAny = data as any;
  if (
    dataAny.error ||
    dataAny.status === 'failure' ||
    dataAny.status === 'error'
  ) {
    return { data: data as T, ok: false, status: response.status };
  }

  return { data: data as T, ok: response.ok, status: response.status };
};
