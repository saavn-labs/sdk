import { runSaavnTestCases } from '../helpers/spec.helper';
import { SaavnGetRecoSchema } from '../../src/saavn/operations';

const GROUP_NAME = 'Get Reco';

const testCases = [
  { request: 'Get Album Reco', op: SaavnGetRecoSchema.albums },
  {
    request: 'Get Playlist Reco',
    op: SaavnGetRecoSchema.playlists,
  },
  { request: 'Get Song Reco', op: SaavnGetRecoSchema.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
