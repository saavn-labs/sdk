import {
  SaavnGetDetails,
  SaavnSearchResults,
  SaavnWebAPI,
} from '@/saavn/operations/index.js';
import { runOperation } from '@/saavn/run-operation.js';
import { extractPermalinkToken } from '@/helpers/utils.js';
import { SDKError } from '@/helpers/errors.js';

/**
 * Fetch an artist by Saavn ID.
 *
 * @param params - Parameters object
 * @param params.artistId - Saavn artist ID
 * @returns Normalized artist object
 */
function getById({ artistId }: { artistId: string }) {
  return runOperation(SaavnGetDetails.artist, { artistId });
}

/**
 * Fetch an artist by permalink.
 *
 * @param params - Parameters object
 * @param params.permalink - Artist permalink string
 * @returns Normalized artist object
 */
function getByPermalink({ permalink }: { permalink: string }) {
  const { token, type } = extractPermalinkToken(permalink) ?? {};
  if (!token || type !== 'artist') {
    throw new SDKError('INVALID_PARAMS', 'Invalid permalink provided');
  }
  return runOperation(SaavnWebAPI.artist, { token, type: 'artist' });
}

/**
 * Search for artists by query.
 *
 * @param params - Parameters object
 * @param params.query - Search query string
 * @param params.limit - Number of results to return (default: 10)
 * @param params.offset - Offset for pagination (default: 1)
 * @returns List of matching artists
 */
function search({
  query,
  limit = 20,
  offset = 1,
}: {
  query: string;
  limit?: number;
  offset?: number;
}) {
  return runOperation(SaavnSearchResults.artists, {
    q: query,
    p: String(offset),
    n: String(limit),
  });
}

export const ArtistModule = {
  getById,
  getByPermalink,
  search,
};
