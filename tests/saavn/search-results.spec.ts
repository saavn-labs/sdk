import { runSaavnTestCases } from '../helpers/spec.helper';
import { SaavnSearchResultsSchema } from '../../src/saavn/operations';

const GROUP_NAME = 'Search Results';

const testCases = [
  { request: 'Search All', op: SaavnSearchResultsSchema.all },
  { request: 'Search Albums', op: SaavnSearchResultsSchema.albums },
  { request: 'Search Artists', op: SaavnSearchResultsSchema.artists },
  {
    request: 'Search Playlists',
    op: SaavnSearchResultsSchema.playlists,
  },
  { request: 'Search Songs', op: SaavnSearchResultsSchema.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
