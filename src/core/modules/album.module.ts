import {
  SaavnGetDetails,
  SaavnGetReco,
  SaavnGetTrending,
  SaavnSearchResults,
  SaavnWebAPI,
} from '@/saavn/operations';
import { runOperation } from '@/saavn/run-operation';
import { extractPermalinkToken } from '@/helpers/utils';
import { SDKError } from '@/helpers/errors';

/**
 * Fetch an album by Saavn ID.
 *
 * @param params - Parameters object
 * @param params.albumId - Saavn album ID
 * @returns Normalized album object
 */
function getById({ albumId }: { albumId: string }) {
  return runOperation(SaavnGetDetails.album, { albumid: albumId });
}

/**
 * Fetch an album by permalink.
 *
 * @param params - Parameters object
 * @param params.permalink - Album permalink string
 * @returns Normalized album object
 */
function getByPermalink({ permalink }: { permalink: string }) {
  const { token, type } = extractPermalinkToken(permalink) ?? {};
  if (!token || type !== 'album') {
    throw new SDKError('INVALID_PARAMS', 'Invalid permalink provided');
  }
  return runOperation(SaavnWebAPI.album, { token, type: 'album' });
}

/**
 * Fetch album recommendations by Saavn ID.
 *
 * @param params - Parameters object
 * @param params.albumId - Saavn album ID
 * @returns List of recommended albums
 */
function getRecommendations({ albumId }: { albumId: string }) {
  return runOperation(SaavnGetReco.albums, { albumid: albumId });
}

/**
 * Get trending albums by language.
 *
 * @param params - Parameters object
 * @param params.language - Language code
 * @returns List of trending albums
 */
function getTrending({ language }: { language: string }) {
  return runOperation(SaavnGetTrending.albums, {
    entity_language: language,
    entity_type: 'album',
  });
}

/**
 * Search for albums by query.
 *
 * @param params - Parameters object
 * @param params.query - Search query string
 * @param params.limit - Number of results to return (default: 10)
 * @param params.offset - Offset for pagination (default: 1)
 * @returns List of matching albums
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
  return runOperation(SaavnSearchResults.albums, {
    q: query,
    p: String(offset),
    n: String(limit),
  });
}

export const AlbumModule = {
  getById,
  getByPermalink,
  getRecommendations,
  getTrending,
  search,
};
