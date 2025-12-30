import { runSaavnTestCases } from '../helpers/spec.helper';
import { SaavnWebRadioSchema } from '../../src/saavn/operations';

const GROUP_NAME = 'Web Radio';

const testCases = [
  {
    request: 'Create Entity Station',
    op: SaavnWebRadioSchema.entityStation,
  },
  {
    request: 'Create Featured Station',
    op: SaavnWebRadioSchema.featuredStation,
  },
  { request: 'Get Station Songs', op: SaavnWebRadioSchema.songs },
];

runSaavnTestCases(GROUP_NAME, testCases);
