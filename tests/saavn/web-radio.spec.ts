import { runSaavnTestCases } from '../helpers/spec.helper';
import { SaavnWebRadio } from '../../src/saavn/operations/web-radio/index';

const GROUP_NAME = 'Web Radio';

const testCases = [
  {
    key: 'entityStation',
    request: 'Create Entity Station',
    op: SaavnWebRadio.entityStation,
  },
  {
    key: 'featuredStation',
    request: 'Create Featured Station',
    op: SaavnWebRadio.featuredStation,
  },
  { key: 'songs', request: 'Get Station Songs', op: SaavnWebRadio.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
