import {
  SaavnGetDetails,
  SaavnGetReco,
  SaavnGetTrending,
  SaavnSearchResults,
  SaavnWebAPI,
  SaavnWebRadio,
} from '@/saavn/operations/index.js';
import { runOperation } from '@/saavn/run-operation.js';
import { extractPermalinkToken } from '@/helpers/utils.js';
import { fetchStreamUrls } from '@/helpers/experimental/stream-urls/index.js';
import { SDKError } from '@/helpers/errors.js';

/**
 * Fetch a song or songs by Saavn ID.
 *
 * @param params - Parameters object
 * @param params.songIds - Saavn song ID or array of IDs
 * @returns Normalized song object or list
 */
function getById({ songIds }: { songIds: string[] | string }) {
  return runOperation(SaavnGetDetails.songs, {
    pids: songIds instanceof Array ? songIds.join(',') : songIds,
  });
}

/**
 * Fetch a song by permalink.
 *
 * @param params - Parameters object
 * @param params.permalink - Song permalink string
 * @returns Normalized song object
 */
function getByPermalink({ permalink }: { permalink: string }) {
  const { token, type } = extractPermalinkToken(permalink) ?? {};

  if (!token || type !== 'song') {
    throw new SDKError('INVALID_PARAMS', 'Invalid permalink provided');
  }

  return runOperation(SaavnWebAPI.songs, { token, type: 'song' });
}
/**
 * Fetch songs by station ID.
 *
 * @param params - Parameters object
 * @param params.stationId - Station ID
 * @param params.limit - Number of songs to fetch (default: 10)
 * @param params.next - Whether to get next songs (optional)
 * @returns List of songs from station
 */
function getByStationId({
  stationId,
  limit = 20,
  next,
}: {
  stationId: string;
  limit?: number;
  next?: boolean;
}) {
  return runOperation(SaavnWebRadio.songs, {
    ctx: 'android',
    stationid: stationId,
    k: String(limit),
    next: next ? '1' : '0',
  });
}

/**
 * Fetch song recommendations by Saavn ID.
 *
 * @param params - Parameters object
 * @param params.songId - Saavn song ID
 * @returns List of recommended songs
 */
function getRecommendations({ songId }: { songId: string }) {
  return runOperation(SaavnGetReco.songs, { pid: songId });
}

/**
 * Get trending songs by language.
 * @param params - Parameters object
 * @param params.language - Language code
 * @returns List of trending songs
 */
function getTrending({ language }: { language: string }) {
  return runOperation(SaavnGetTrending.songs, {
    entity_language: language,
    entity_type: 'song',
  });
}

/**
 * Search for songs by query.
 *
 * @param params - Parameters object
 * @param params.query - Search query string
 * @param params.limit - Number of results to return (default: 10)
 * @param params.offset - Offset for pagination (default: 1)
 * @returns List of matching songs
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
  return runOperation(SaavnSearchResults.songs, {
    q: query,
    p: String(offset),
    n: String(limit),
  });
}

export const SongModule = {
  getById,
  getByPermalink,
  getByStationId,
  getRecommendations,
  getTrending,
  search,
  experimental: {
    fetchStreamUrls,
  },
};
