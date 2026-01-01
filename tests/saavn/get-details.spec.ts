import { runSaavnTestCases } from './helpers/spec.helper';
import { SaavnGetDetails } from '../../src/saavn/operations';

const GROUP_NAME = 'Get Details';

const testCases = [
  { request: 'Get Album Details', op: SaavnGetDetails.album },
  { request: 'Get Artist Details', op: SaavnGetDetails.artist },
  {
    request: 'Get Playlist Details',
    op: SaavnGetDetails.playlist,
  },
  { request: 'Get Song Details', op: SaavnGetDetails.songs },
  {
    request: 'Get Top Albums Of The Year',
    op: SaavnGetDetails.topAlbumsOfTheYear,
  },
  {
    request: 'Get Top Searches',
    op: SaavnGetDetails.topSearches,
  },
];

runSaavnTestCases(GROUP_NAME, testCases);
