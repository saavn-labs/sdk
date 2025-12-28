import { z } from 'zod';
import { NonEmptyString, PositiveString } from '../../primitives/string';

// Allow "0" or positive numeric strings for pagination
const PageString = z.string().regex(/^\d+$/, 'Expected a numeric string');

export const SaavnGetSearchResultsParamsSchemas = {
  all: z.strictObject({
    query: NonEmptyString,
  }),

  albums: z.strictObject({
    q: NonEmptyString,
    p: PageString.optional(),
    n: PositiveString.optional(),
  }),

  artists: z.strictObject({
    q: NonEmptyString,
    p: PageString.optional(),
    n: PositiveString.optional(),
  }),

  playlists: z.strictObject({
    q: NonEmptyString,
    p: PageString.optional(),
    n: PositiveString.optional(),
  }),

  songs: z.strictObject({
    q: NonEmptyString,
    p: PageString.optional(),
    n: PositiveString.optional(),
  }),
};
