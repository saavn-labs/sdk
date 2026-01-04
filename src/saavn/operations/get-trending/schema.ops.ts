import { z } from 'zod';
import { NonEmptyString } from '../../primitives/string.js';
import {
  SaavnTrendingAlbum,
  SaavnTrendingPlaylist,
  SaavnTrendingSongEntity,
} from '../../entities/index.js';

export const SaavnGetTrendingSchema = {
  all: {
    params: z.strictObject({}),
    response: z.array(
      z.discriminatedUnion('type', [
        SaavnTrendingAlbum,
        SaavnTrendingPlaylist,
        SaavnTrendingSongEntity,
      ]),
    ),
  },

  albums: {
    params: z.strictObject({
      entity_type: z.literal('album'),
      entity_language: NonEmptyString,
    }),
    response: z.array(SaavnTrendingAlbum),
  },

  playlists: {
    params: z.strictObject({
      entity_type: z.literal('playlist'),
      entity_language: NonEmptyString,
    }),
    response: z.array(SaavnTrendingPlaylist),
  },

  songs: {
    params: z.strictObject({
      entity_type: z.literal('song'),
      entity_language: NonEmptyString,
    }),
    response: z.array(SaavnTrendingSongEntity),
  },
} as const;
