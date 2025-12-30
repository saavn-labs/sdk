import { z } from 'zod';

export const SaavnShowEntity = z.looseObject({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.literal('show'),
  image: z.string(),
  perma_url: z.string(),
  more_info: z.looseObject({
    season_number: z.number(),
  }),
  explicit_content: z.string(),
  description: z.string(),
});
