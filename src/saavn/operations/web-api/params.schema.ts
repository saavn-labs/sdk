import { z } from 'zod';
import { NonEmptyString, PositiveString } from '../../primitives/string';
import {
  SaavnSortBySchema,
  SaavnSortOrderSchema,
} from '../../primitives/enums';

export const SaavnWebAPIParamsSchemas = {
  albums: z.strictObject({
    token: NonEmptyString,
    type: z.literal('album'),
  }),

  artists: z.strictObject({
    token: NonEmptyString,
    type: z.literal('artist'),
    n_song: PositiveString.optional(),
    n_album: PositiveString.optional(),
    category: SaavnSortBySchema.optional(),
    sort_order: SaavnSortOrderSchema.optional(),
  }),

  laels: z.strictObject({
    token: NonEmptyString,
    type: z.literal('label'),
    n_song: PositiveString.optional(),
    n_album: PositiveString.optional(),
  }),

  playlists: z.strictObject({
    token: NonEmptyString,
    type: z.literal('playlist'),
    n: PositiveString.optional(),
  }),

  songs: z.strictObject({
    token: NonEmptyString,
    type: z.literal('song'),
  }),
};
