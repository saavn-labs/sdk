import { runSaavnTestCases } from '../helpers/spec.helper';
import { SaavnGetTrendingSchema } from '../../src/saavn/operations';

const GROUP_NAME = 'Get Trending';

const testCases = [
  { request: 'Get Trending All', op: SaavnGetTrendingSchema.all },
  {
    request: 'Get Trending Albums',
    op: SaavnGetTrendingSchema.albums,
  },
  {
    request: 'Get Trending Playlists',
    op: SaavnGetTrendingSchema.playlists,
  },
  { request: 'Get Trending Songs', op: SaavnGetTrendingSchema.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
