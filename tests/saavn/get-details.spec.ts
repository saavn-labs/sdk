import { runSaavnTestCases } from '../helpers/spec.helper';
import { SaavnGetDetails } from '../../src/saavn/operations/get-details/index';

const GROUP_NAME = 'Get Details';

const testCases = [
  { key: 'album', request: 'Get Album Details', op: SaavnGetDetails.album },
  { key: 'artist', request: 'Get Artist Details', op: SaavnGetDetails.artist },
  {
    key: 'playlist',
    request: 'Get Playlist Details',
    op: SaavnGetDetails.playlist,
  },
  { key: 'song', request: 'Get Song Details', op: SaavnGetDetails.song },
  {
    key: 'topAlbumsOfTheYear',
    request: 'Get Top Albums Of The Year',
    op: SaavnGetDetails.topAlbumsOfTheYear,
  },
  {
    key: 'topSearches',
    request: 'Get Top Searches',
    op: SaavnGetDetails.topSearches,
  },
];

runSaavnTestCases(GROUP_NAME, testCases);
