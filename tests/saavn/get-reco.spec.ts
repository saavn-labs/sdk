import { runSaavnTestCases } from '../helpers/spec.helper';
import { SaavnGetReco } from '../../src/saavn/operations/get-reco/index';

const GROUP_NAME = 'Get Reco';

const testCases = [
  { key: 'albums', request: 'Get Album Reco', op: SaavnGetReco.albums },
  {
    key: 'playlists',
    request: 'Get Playlist Reco',
    op: SaavnGetReco.playlists,
  },
  { key: 'songs', request: 'Get Song Reco', op: SaavnGetReco.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
