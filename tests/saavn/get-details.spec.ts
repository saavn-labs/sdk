import { runSaavnTestCases } from '../helpers/spec.helper';
import { SaavnGetDetailsSchema } from '../../src/saavn/operations';

const GROUP_NAME = 'Get Details';

const testCases = [
  { request: 'Get Album Details', op: SaavnGetDetailsSchema.album },
  { request: 'Get Artist Details', op: SaavnGetDetailsSchema.artist },
  {
    request: 'Get Playlist Details',
    op: SaavnGetDetailsSchema.playlist,
  },
  { request: 'Get Song Details', op: SaavnGetDetailsSchema.songs },
  {
    request: 'Get Top Albums Of The Year',
    op: SaavnGetDetailsSchema.topAlbumsOfTheYear,
  },
  {
    request: 'Get Top Searches',
    op: SaavnGetDetailsSchema.topSearches,
  },
];

runSaavnTestCases(GROUP_NAME, testCases);
