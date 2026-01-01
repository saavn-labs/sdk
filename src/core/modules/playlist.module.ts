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
 * Fetch a playlist by Saavn ID.
 *
 * @param params - Parameters object
 * @param params.playlistId - Saavn playlist ID
 * @returns Normalized playlist object
 */
function getById({ playlistId }: { playlistId: string }) {
  return runOperation(SaavnGetDetails.playlist, { listid: playlistId });
}

/**
 * Fetch a playlist by permalink.
 *
 * @param params - Parameters object
 * @param params.permalink - Playlist permalink string
 * @returns Normalized playlist object
 */
function getByPermalink({ permalink }: { permalink: string }) {
  const { token, type } = extractPermalinkToken(permalink) ?? {};
  if (!token || type !== 'playlist') {
    throw new SDKError('INVALID_PARAMS', 'Invalid permalink provided');
  }

  return runOperation(SaavnWebAPI.playlist, { token, type: 'playlist' });
}

/**
 * Fetch playlist recommendations by Saavn ID.
 *
 * @param params - Parameters object
 * @param params.playlistId - Saavn playlist ID
 * @returns List of recommended playlists
 */
function getRecommendations({ playlistId }: { playlistId: string }) {
  return runOperation(SaavnGetReco.playlists, { listid: playlistId });
}

/**
 * Get trending playlists by language.
 *
 * @param params - Parameters object
 * @param params.language - Language code
 * @returns List of trending playlists
 */
function getTrending({ language }: { language: string }) {
  return runOperation(SaavnGetTrending.playlists, {
    entity_language: language,
    entity_type: 'playlist',
  });
}

/**
 * Search for playlists by query.
 *
 * @param params - Parameters object
 * @param params.query - Search query string
 * @param params.limit - Number of results to return (default: 10)
 * @param params.offset - Offset for pagination (default: 1)
 * @returns List of matching playlists
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
  return runOperation(SaavnSearchResults.playlists, {
    q: query,
    p: String(offset),
    n: String(limit),
  });
}

export const PlaylistModule = {
  getById,
  getByPermalink,
  getRecommendations,
  getTrending,
  search,
};
