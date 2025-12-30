import { runSaavnTestCases } from '../helpers/spec.helper';
import { SaavnWebAPISchema } from '../../src/saavn/operations';

const GROUP_NAME = 'Web API';

const testCases = [
  { request: 'Get Album Details', op: SaavnWebAPISchema.album },
  { request: 'Get Artist Details', op: SaavnWebAPISchema.artist },
  {
    request: 'Get Playlist Details',
    op: SaavnWebAPISchema.playlist,
  },
  { request: 'Get Song Details', op: SaavnWebAPISchema.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
