import { z } from 'zod';
import { NonEmptyString } from '../../primitives/string';
import {
  SaavnTrendingAlbum,
  SaavnTrendingPlaylist,
  SaavnTrendingSongEntity,
} from '../../entities';

export const SaavnGetTrendingSchema = {
  all: {
    call: 'content.getTrending',
    paramsSchema: z.strictObject({}),
    responseSchema: z.array(
      z.discriminatedUnion('type', [
        SaavnTrendingAlbum,
        SaavnTrendingPlaylist,
        SaavnTrendingSongEntity,
      ]),
    ),
  },

  albums: {
    call: 'content.getTrending',
    paramsSchema: z.strictObject({
      entity_type: z.literal('album'),
      entity_language: NonEmptyString,
    }),
    responseSchema: z.array(SaavnTrendingAlbum),
  },

  playlists: {
    call: 'content.getTrending',
    paramsSchema: z.strictObject({
      entity_type: z.literal('playlist'),
      entity_language: NonEmptyString,
    }),
    responseSchema: z.array(SaavnTrendingPlaylist),
  },

  songs: {
    call: 'content.getTrending',
    paramsSchema: z.strictObject({
      entity_type: z.literal('song'),
      entity_language: NonEmptyString,
    }),
    responseSchema: z.array(SaavnTrendingSongEntity),
  },
} as const;
