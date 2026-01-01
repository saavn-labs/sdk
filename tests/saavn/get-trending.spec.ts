import { runSaavnTestCases } from './helpers/spec.helper';
import { SaavnGetTrending } from '../../src/saavn/operations';

const GROUP_NAME = 'Get Trending';

const testCases = [
  { request: 'Get Trending All', op: SaavnGetTrending.all },
  {
    request: 'Get Trending Albums',
    op: SaavnGetTrending.albums,
  },
  {
    request: 'Get Trending Playlists',
    op: SaavnGetTrending.playlists,
  },
  { request: 'Get Trending Songs', op: SaavnGetTrending.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
