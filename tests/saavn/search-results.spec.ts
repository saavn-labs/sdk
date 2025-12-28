import { runSaavnTestCases } from '../helpers/spec.helper';
import { SaavnSearchResults } from '../../src/saavn/operations/search-results/index';

const GROUP_NAME = 'Search Results';

const testCases = [
  { key: 'all', request: 'Search All', op: SaavnSearchResults.all },
  { key: 'albums', request: 'Search Albums', op: SaavnSearchResults.albums },
  { key: 'artists', request: 'Search Artists', op: SaavnSearchResults.artists },
  {
    key: 'playlists',
    request: 'Search Playlists',
    op: SaavnSearchResults.playlists,
  },
  { key: 'songs', request: 'Search Songs', op: SaavnSearchResults.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
