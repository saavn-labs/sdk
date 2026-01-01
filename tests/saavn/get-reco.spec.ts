import { runSaavnTestCases } from './helpers/spec.helper';
import { SaavnGetReco } from '../../src/saavn/operations';

const GROUP_NAME = 'Get Reco';

const testCases = [
  { request: 'Get Album Reco', op: SaavnGetReco.albums },
  {
    request: 'Get Playlist Reco',
    op: SaavnGetReco.playlists,
  },
  { request: 'Get Song Reco', op: SaavnGetReco.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
