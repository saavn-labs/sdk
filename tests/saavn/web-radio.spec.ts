import { runSaavnTestCases } from './helpers/spec.helper';
import { SaavnWebRadio } from '../../src/saavn/operations';

const GROUP_NAME = 'Web Radio';

const testCases = [
  {
    request: 'Create Entity Station',
    op: SaavnWebRadio.createEntityStation,
  },
  {
    request: 'Create Featured Station',
    op: SaavnWebRadio.createFeaturedStation,
  },
  { request: 'Get Station Songs', op: SaavnWebRadio.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
