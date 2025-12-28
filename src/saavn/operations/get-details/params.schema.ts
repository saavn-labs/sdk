import { z } from 'zod';
import {
  CSVString,
  NonEmptyString,
  PositiveString,
} from '../../primitives/string';
import {
  SaavnSortBySchema,
  SaavnSortOrderSchema,
} from '../../primitives/enums';

export const SaavnGetDetailsParamsSchemas = {
  album: z.strictObject({
    albumid: PositiveString,
  }),

  artist: z.strictObject({
    artistId: PositiveString,
    n_song: PositiveString.optional(),
    n_album: PositiveString.optional(),
    category: SaavnSortBySchema.optional(),
    sort_order: SaavnSortOrderSchema.optional(),
  }),

  playlist: z.strictObject({
    listid: PositiveString,
    p: PositiveString.optional(),
    n: PositiveString.optional(),
  }),

  song: z.strictObject({
    pids: CSVString,
  }),

  topAlbumsOfTheYear: z.strictObject({
    album_year: PositiveString,
    album_lang: NonEmptyString.optional(),
  }),

  topSearches: z.strictObject({}),
};
