import { SaavnGetDetailsSchema } from '@/saavn/operations/get-details/schema.ops.js';
import { SaavnGetRecoSchema } from '@/saavn/operations/get-reco/schema.ops.js';
import { SaavnGetTrendingSchema } from '@/saavn/operations/get-trending/schema.ops.js';
import { SaavnSearchResultsSchema } from '@/saavn/operations/search-results/schema.ops.js';
import { SaavnWebAPISchema } from '@/saavn/operations/web-api/schema.ops.js';
import { SaavnWebRadioSchema } from '@/saavn/operations/web-radio/schema.ops.js';

export const schemas = {
  details: SaavnGetDetailsSchema,
  recommendations: SaavnGetRecoSchema,
  trending: SaavnGetTrendingSchema,
  search: SaavnSearchResultsSchema,
  webApi: SaavnWebAPISchema,
  webRadio: SaavnWebRadioSchema,
} as const;

export type Schemas = typeof schemas;
