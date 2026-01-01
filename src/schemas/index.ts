import { SaavnGetDetailsSchema } from '@/saavn/operations/get-details/schema.ops';
import { SaavnGetRecoSchema } from '@/saavn/operations/get-reco/schema.ops';
import { SaavnGetTrendingSchema } from '@/saavn/operations/get-trending/schema.ops';
import { SaavnSearchResultsSchema } from '@/saavn/operations/search-results/schema.ops';
import { SaavnWebAPISchema } from '@/saavn/operations/web-api/schema.ops';
import { SaavnWebRadioSchema } from '@/saavn/operations/web-radio/schema.ops';

export const schemas = {
  details: SaavnGetDetailsSchema,
  recommendations: SaavnGetRecoSchema,
  trending: SaavnGetTrendingSchema,
  search: SaavnSearchResultsSchema,
  webApi: SaavnWebAPISchema,
  webRadio: SaavnWebRadioSchema,
} as const;

export type Schemas = typeof schemas;
