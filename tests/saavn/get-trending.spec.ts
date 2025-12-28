import { runSaavnTestCases } from '../helpers/spec.helper';
import { SaavnGetTrending } from '../../src/saavn/operations/get-trending/index';

const GROUP_NAME = 'Get Trending';

const testCases = [
  { key: 'all', request: 'Get Trending All', op: SaavnGetTrending.all },
  {
    key: 'albums',
    request: 'Get Trending Albums',
    op: SaavnGetTrending.albums,
  },
  {
    key: 'playlists',
    request: 'Get Trending Playlists',
    op: SaavnGetTrending.playlists,
  },
  { key: 'songs', request: 'Get Trending Songs', op: SaavnGetTrending.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
