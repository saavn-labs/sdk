import { runSaavnTestCases } from '../helpers/spec.helper';
import { SaavnWebAPI } from '../../src/saavn/operations/web-api/index';

const GROUP_NAME = 'Web API';

const testCases = [
  { key: 'album', request: 'Get Album Details', op: SaavnWebAPI.album },
  { key: 'artist', request: 'Get Artist Details', op: SaavnWebAPI.artist },
  {
    key: 'playlist',
    request: 'Get Playlist Details',
    op: SaavnWebAPI.playlist,
  },
  { key: 'songs', request: 'Get Song Details', op: SaavnWebAPI.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
