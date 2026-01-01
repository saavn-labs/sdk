import { z } from 'zod';
import {
  SaavnAlbumEntity,
  SaavnArtistEntity,
  SaavnPlaylistEntity,
  SaavnSongEntity,
  SaavnTopSearchesEntity,
} from '../../entities';
import {
  CSVString,
  NonEmptyString,
  PositiveString,
} from '../../primitives/string';
import {
  SaavnSortBySchema,
  SaavnSortOrderSchema,
} from '../../primitives/enums';

export const SaavnGetDetailsSchema = {
  album: {
    params: z.strictObject({
      albumid: PositiveString,
    }),
    response: SaavnAlbumEntity,
  },

  artist: {
    params: z.strictObject({
      artistId: PositiveString,
      n_song: PositiveString.optional(),
      n_album: PositiveString.optional(),
      category: SaavnSortBySchema.optional(),
      sort_order: SaavnSortOrderSchema.optional(),
    }),
    response: SaavnArtistEntity,
  },

  playlist: {
    params: z.strictObject({
      listid: PositiveString,
      p: PositiveString.optional(),
      n: PositiveString.optional(),
    }),
    response: SaavnPlaylistEntity,
  },

  songs: {
    params: z.strictObject({
      pids: CSVString,
    }),
    response: z.looseObject({
      songs: z.array(SaavnSongEntity),
    }),
  },

  topAlbumsOfTheYear: {
    params: z.strictObject({
      album_year: PositiveString,
      album_lang: NonEmptyString.optional(),
    }),
    response: z.array(SaavnAlbumEntity),
  },

  topSearches: {
    params: z.strictObject({}),
    response: z.array(SaavnTopSearchesEntity),
  },
} as const;
