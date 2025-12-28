import { z } from 'zod';
import {
  JSONArrayString,
  NonEmptyString,
  PositiveString,
} from '../../primitives/string';
import { SaavnExplicitFlagSchema } from '../../primitives/enums';

export const SaavnWebRadioParamsSchemas = {
  entityStation: z.strictObject({
    ctx: z.literal('android'),
    entity_type: z.literal('queue'),
    entity_id: JSONArrayString,
  }),
  featuredStation: z.strictObject({
    name: NonEmptyString,
    language: NonEmptyString,
  }),
  songs: z.strictObject({
    ctx: z.literal('android'),
    stationid: NonEmptyString,
    k: PositiveString.optional(),
    next: SaavnExplicitFlagSchema.optional(),
  }),
};
