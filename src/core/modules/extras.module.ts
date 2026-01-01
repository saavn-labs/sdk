import { SDKError } from '@/helpers/errors';
import {
  SaavnGetTrending,
  SaavnSearchResults,
  SaavnWebRadio,
} from '@/saavn/operations';
import { runOperation } from '@/saavn/run-operation';

export function stringArrayToJSONStringArray(value: readonly string[]): string {
  if (!Array.isArray(value) || value.length === 0) {
    throw new SDKError(
      'INVALID_PARAMS',
      'Expected a non-empty array of strings',
    );
  }

  if (!value.every((v) => typeof v === 'string' && v.length > 0)) {
    throw new SDKError('INVALID_PARAMS', 'All items must be non-empty strings');
  }

  return JSON.stringify(value);
}

/**
 * Search all entities by query.
 *
 * @param params - Parameters object
 * @param params.query - Search query string
 * @returns List of matching entities
 */
function searchAll({ query }: { query: string }) {
  return runOperation(SaavnSearchResults.all, { query });
}

/**
 * Get trending entities.
 *
 * @returns List of trending entities
 */
function getTrendingAll() {
  return runOperation(SaavnGetTrending.all, {});
}

/**
 * Create a station for an entity.
 *
 * @param params - Parameters object
 * @param params.songIds - Array of song IDs
 * @returns Station object
 */
function createEntityStation({ songIds }: { songIds: string[] }) {
  return runOperation(SaavnWebRadio.createEntityStation, {
    ctx: 'android',
    entity_type: 'queue',
    entity_id: stringArrayToJSONStringArray(songIds),
  });
}

/**
 * Create a featured station by language and name.
 *
 * @param params - Parameters object
 * @param params.language - Language code
 * @param params.name - Station name
 * @returns Station object
 */
function createFeaturedStation({
  language,
  name,
}: {
  language: string;
  name: string;
}) {
  return runOperation(SaavnWebRadio.createFeaturedStation, {
    language,
    name,
  });
}

export const ExtrasModule = {
  searchAll,
  getTrendingAll,
  createEntityStation,
  createFeaturedStation,
};
