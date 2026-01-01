/**
 * General utilities for @saavn-labs/sdk
 * @module utils
 * @internal
 */

import type { SaavnPermalinkToken } from '@/types';

const DEFAULT_USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
] as const;

export function pickUserAgent(custom?: readonly string[]): string {
  const agents =
    Array.isArray(custom) && custom.length > 0 ? custom : DEFAULT_USER_AGENTS;

  return agents[Math.floor(Math.random() * agents.length)]!;
}

/**
 * Extract entity type and token from a JioSaavn share URL
 * @param permaLink - JioSaavn share URL or token
 * @returns Extracted token object or undefined if invalid
 */
export function extractPermalinkToken(
  permaLink: string,
): SaavnPermalinkToken | undefined {
  if (!permaLink || typeof permaLink !== 'string') return undefined;

  let url: URL;
  try {
    url = permaLink.startsWith('http')
      ? new URL(permaLink)
      : new URL(permaLink, 'https://www.jiosaavn.com');
  } catch {
    return undefined;
  }

  const segments = url.pathname.split('/').filter(Boolean);
  if (segments.length < 2) return undefined;

  const token = segments.at(-1);
  if (!token) return undefined;

  const root = segments[0] === 's' ? segments[1] : segments[0];

  switch (root) {
    case 'song':
      return { type: 'song', token };

    case 'album':
      return { type: 'album', token };

    case 'artist':
      return { type: 'artist', token };

    case 'label':
      return { type: 'label', token };

    case 'playlist':
    case 'featured':
      return { type: 'playlist', token };

    case 'show':
      return { type: 'show', token };

    default:
      return undefined;
  }
}
