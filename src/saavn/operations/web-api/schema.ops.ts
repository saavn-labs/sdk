import { z } from 'zod';
import { NonEmptyString, PositiveString } from '../../primitives/string.js';
import {
  SaavnSortBySchema,
  SaavnSortOrderSchema,
} from '../../primitives/enums.js';
import {
  SaavnAlbumEntity,
  SaavnArtistEntity,
  SaavnPlaylistEntity,
  SaavnSongEntity,
} from '../../entities/index.js';

export const SaavnWebAPISchema = {
  album: {
    params: z.strictObject({
      token: NonEmptyString,
      type: z.literal('album'),
    }),
    response: SaavnAlbumEntity,
  },

  artist: {
    params: z.strictObject({
      token: NonEmptyString,
      type: z.literal('artist'),
      n_song: PositiveString.optional(),
      n_album: PositiveString.optional(),
      category: SaavnSortBySchema.optional(),
      sort_order: SaavnSortOrderSchema.optional(),
    }),
    response: SaavnArtistEntity,
  },

  label: {
    params: z.strictObject({
      token: NonEmptyString,
      type: z.literal('label'),
      n_song: PositiveString.optional(),
      n_album: PositiveString.optional(),
    }),
    response: z.any(),
  },

  playlist: {
    params: z.strictObject({
      token: NonEmptyString,
      type: z.literal('playlist'),
      n: PositiveString.optional(),
    }),
    response: SaavnPlaylistEntity,
  },

  songs: {
    params: z.strictObject({
      token: NonEmptyString,
      type: z.literal('song'),
    }),
    response: z.looseObject({
      songs: z.array(SaavnSongEntity),
    }),
  },
} as const;
