// saavn/operations/search-results.ts
import { z } from 'zod';
import { NonEmptyString, PositiveString } from '../../primitives/string';
import { SaavnArtistBase } from '../../entities/base';
import {
  SaavnAlbumEdgeCase,
  SaavnPlaylistEdgeCase,
  SaavnSongEntity,
  SaavnSearchAllEntity,
  SaavnArtistSearchEntity,
  SaavnPlaylistSearchEntity,
  SaavnSongSearchEntity,
  SaavnShowEntity,
} from '../../entities';

const PageString = z.string().regex(/^\d+$/);

export const SaavnSearchResultsSchema = {
  all: {
    call: 'autocomplete.get',
    paramsSchema: z.strictObject({
      query: NonEmptyString,
    }),
    responseSchema: z.looseObject({
      albums: z.looseObject({
        position: z.number(),
        data: z.array(SaavnSearchAllEntity),
      }),
      artists: z.looseObject({
        position: z.number(),
        data: z.array(SaavnArtistSearchEntity),
      }),
      playlists: z.looseObject({
        position: z.number(),
        data: z.array(SaavnPlaylistSearchEntity),
      }),
      songs: z.looseObject({
        position: z.number(),
        data: z.array(SaavnSongSearchEntity),
      }),
      shows: z.looseObject({
        position: z.number(),
        data: z.array(SaavnShowEntity),
      }),
      episodes: z.looseObject({
        position: z.number(),
        data: z.array(z.any()),
      }),
      topquery: z.looseObject({
        position: z.number(),
        data: z.array(SaavnSongSearchEntity),
      }),
    }),
  },

  albums: {
    call: 'search.getAlbumResults',
    paramsSchema: z.strictObject({
      q: NonEmptyString,
      p: PageString.optional(),
      n: PositiveString.optional(),
    }),
    responseSchema: z.looseObject({
      total: z.number(),
      start: z.number(),
      results: z.array(SaavnAlbumEdgeCase),
    }),
  },

  artists: {
    call: 'search.getArtistResults',
    paramsSchema: z.strictObject({
      q: NonEmptyString,
      p: PageString.optional(),
      n: PositiveString.optional(),
    }),
    responseSchema: z.looseObject({
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
    call: 'search.getPlaylistResults',
    paramsSchema: z.strictObject({
      q: NonEmptyString,
      p: PageString.optional(),
      n: PositiveString.optional(),
    }),
    responseSchema: z.looseObject({
      total: z.number(),
      start: z.number(),
      results: z.array(SaavnPlaylistEdgeCase),
    }),
  },

  songs: {
    call: 'search.getResults',
    paramsSchema: z.strictObject({
      q: NonEmptyString,
      p: PageString.optional(),
      n: PositiveString.optional(),
    }),
    responseSchema: z.looseObject({
      total: z.number(),
      start: z.number(),
      results: z.array(SaavnSongEntity),
    }),
  },
} as const;
