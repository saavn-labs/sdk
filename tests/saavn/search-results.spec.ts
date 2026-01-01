import { runSaavnTestCases } from './helpers/spec.helper';
import { SaavnSearchResults } from '../../src/saavn/operations';

const GROUP_NAME = 'Search Results';

const testCases = [
  { request: 'Search All', op: SaavnSearchResults.all },
  { request: 'Search Albums', op: SaavnSearchResults.albums },
  { request: 'Search Artists', op: SaavnSearchResults.artists },
  {
    request: 'Search Playlists',
    op: SaavnSearchResults.playlists,
  },
  { request: 'Search Songs', op: SaavnSearchResults.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
