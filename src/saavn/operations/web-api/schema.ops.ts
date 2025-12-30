import { z } from 'zod';
import { NonEmptyString, PositiveString } from '../../primitives/string';
import { SaavnSortBySchema, SaavnSortOrderSchema } from '../../primitives/enums';
import {
  SaavnAlbumEntity,
  SaavnArtistEntity,
  SaavnPlaylistEntity,
  SaavnSongEntity,
} from '../../entities';

export const SaavnWebAPISchema = {
  album: {
    call: 'webapi.get',
    paramsSchema: z.strictObject({
      token: NonEmptyString,
      type: z.literal('album'),
    }),
    responseSchema: SaavnAlbumEntity,
  },

  artist: {
    call: 'webapi.get',
    paramsSchema: z.strictObject({
      token: NonEmptyString,
      type: z.literal('artist'),
      n_song: PositiveString.optional(),
      n_album: PositiveString.optional(),
      category: SaavnSortBySchema.optional(),
      sort_order: SaavnSortOrderSchema.optional(),
    }),
    responseSchema: SaavnArtistEntity,
  },

  label: {
    call: 'webapi.get',
    paramsSchema: z.strictObject({
      token: NonEmptyString,
      type: z.literal('label'),
      n_song: PositiveString.optional(),
      n_album: PositiveString.optional(),
    }),
    responseSchema: z.any(),
  },

  playlist: {
    call: 'webapi.get',
    paramsSchema: z.strictObject({
      token: NonEmptyString,
      type: z.literal('playlist'),
      n: PositiveString.optional(),
    }),
    responseSchema: SaavnPlaylistEntity,
  },

  songs: {
    call: 'webapi.get',
    paramsSchema: z.strictObject({
      token: NonEmptyString,
      type: z.literal('song'),
    }),
    responseSchema: z.looseObject({
      songs: z.array(SaavnSongEntity),
    }),
  },
} as const;
