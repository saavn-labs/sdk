import { runSaavnTestCases } from './helpers/spec.helper';
import { SaavnWebAPI } from '../../src/saavn/operations';

const GROUP_NAME = 'Web API';

const testCases = [
  { request: 'Get Album Details', op: SaavnWebAPI.album },
  { request: 'Get Artist Details', op: SaavnWebAPI.artist },
  {
    request: 'Get Playlist Details',
    op: SaavnWebAPI.playlist,
  },
  { request: 'Get Song Details', op: SaavnWebAPI.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
