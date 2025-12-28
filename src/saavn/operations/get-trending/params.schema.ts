import { z } from 'zod';
import { NonEmptyString, PositiveString } from '../../primitives/string';

export const SaavnGetTrendingParamsSchemas = {
  all: z.strictObject({}),

  albums: z.strictObject({
    entity_type: z.literal('album'),
    entity_language: NonEmptyString,
  }),

  playlists: z.strictObject({
    entity_type: z.literal('playlist'),
    entity_language: NonEmptyString,
  }),

  songs: z.strictObject({
    entity_type: z.literal('song'),
    entity_language: NonEmptyString,
  }),
};
