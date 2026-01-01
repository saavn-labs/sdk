import { z } from 'zod';
import { NonEmptyString, PositiveString } from '../../primitives/string';
import { SaavnArtistBase } from '../../entities/base';
import {
  SaavnAlbumEdgeCase,
  SaavnPlaylistEdgeCase,
  SaavnSongEntity,
  SaavnSearchAlbumEntity,
  SaavnArtistSearchEntity,
  SaavnPlaylistSearchEntity,
  SaavnSongSearchEntity,
  SaavnShowEntity,
} from '../../entities';

const PageString = z.string().regex(/^\d+$/);

export const SaavnSearchResultsSchema = {
  all: {
    params: z.strictObject({
      query: NonEmptyString,
    }),
    response: z.looseObject({
      albums: z.looseObject({
        position: z.number(),
        data: z.array(SaavnSearchAlbumEntity),
      }),

      artists: z.looseObject({
        position: z.number(),
        data: z.array(SaavnArtistSearchEntity),
      }),

      playlists: z.looseObject({
        position: z.number(),
        data: z.array(SaavnPlaylistSearchEntity),
      }),

      shows: z.looseObject({
        position: z.number(),
        data: z.array(SaavnShowEntity),
      }),

      songs: z.looseObject({
        position: z.number(),
        data: z.array(SaavnSongSearchEntity),
      }),

      episodes: z.looseObject({
        position: z.number(),
        data: z.array(z.any()),
      }),

      topquery: z.looseObject({
        position: z.number(),
        data: z.array(
          z.discriminatedUnion('type', [
            SaavnSearchAlbumEntity,
            SaavnArtistSearchEntity,
            SaavnPlaylistSearchEntity,
            SaavnSongSearchEntity,
            SaavnShowEntity,
          ]),
        ),
      }),
    }),
  },

  albums: {
    params: z.strictObject({
      q: NonEmptyString,
      p: PageString.optional(),
      n: PositiveString.optional(),
    }),
    response: z.looseObject({
      total: z.number(),
      start: z.number(),
      results: z.array(SaavnAlbumEdgeCase),
    }),
  },

  artists: {
    params: z.strictObject({
      q: NonEmptyString,
      p: PageString.optional(),
      n: PositiveString.optional(),
    }),
    response: z.looseObject({
      total: z.number(),
      start: z.number(),
      results: z.array(
        SaavnArtistBase.extend({
          ctr: z.number(),
          entity: z.number(),
          isRadioPresent: z.boolean(),
          is_followed: z.boolean(),
        }),
      ),
    }),
  },

  playlists: {
    params: z.strictObject({
      q: NonEmptyString,
      p: PageString.optional(),
      n: PositiveString.optional(),
    }),
    response: z.looseObject({
      total: z.number(),
      start: z.number(),
      results: z.array(SaavnPlaylistEdgeCase),
    }),
  },

  songs: {
    params: z.strictObject({
      q: NonEmptyString,
      p: PageString.optional(),
      n: PositiveString.optional(),
    }),
    response: z.looseObject({
      total: z.number(),
      start: z.number(),
      results: z.array(SaavnSongEntity),
    }),
  },
} as const;
