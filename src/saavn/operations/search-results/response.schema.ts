import { z } from 'zod';
import { SaavnArtistBase } from '../../entities/base';
import {
  SaavnSongEntity,
  SaavnShowEntity,
  SaavnAlbumEdgeCase,
  SaavnPlaylistEdgeCase,
  SaavnSearchAllEntity,
  SaavnArtistSearchEntity,
  SaavnPlaylistSearchEntity,
  SaavnSongSearchEntity,
} from '../../entities';

export const SaavnSearchResultsResponseSchemas = {
  all: z.strictObject({
    albums: z.strictObject({
      position: z.number(),
      data: z.array(SaavnSearchAllEntity),
    }),
    artists: z.strictObject({
      position: z.number(),
      data: z.array(SaavnArtistSearchEntity),
    }),
    playlists: z.strictObject({
      position: z.number(),
      data: z.array(SaavnPlaylistSearchEntity),
    }),
    songs: z.strictObject({
      position: z.number(),
      data: z.array(SaavnSongSearchEntity),
    }),
    shows: z.strictObject({
      position: z.number(),
      data: z.array(SaavnShowEntity),
    }),
    episodes: z.strictObject({
      position: z.number(),
      data: z.array(z.any()),
    }),
    topquery: z.strictObject({
      position: z.number(),
      data: z.array(SaavnSongSearchEntity),
    }),
  }),
  albums: z.strictObject({
    total: z.number(),
    start: z.number(),
    results: z.array(SaavnAlbumEdgeCase),
  }),
  artists: z.strictObject({
    total: z.number(),
    start: z.number(),
    results: z.array(
      SaavnArtistBase.extend({
        ctr: z.number(),
        entity: z.number(),
        isRadioPresent: z.boolean(),
        mini_obj: z.boolean(),
        is_followed: z.boolean(),
      }),
    ),
  }),
  playlists: z.strictObject({
    total: z.number(),
    start: z.number(),
    results: z.array(SaavnPlaylistEdgeCase),
  }),
  songs: z.strictObject({
    total: z.number(),
    start: z.number(),
    results: z.array(SaavnSongEntity),
  }),
} as const;
