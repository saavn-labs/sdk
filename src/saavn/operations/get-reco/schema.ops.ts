import { z } from 'zod';
import { NonEmptyString, PositiveString } from '../../primitives/string.js';
import { SaavnAlbumBase, SaavnPlaylistBase } from '../../entities/base.js';
import { SaavnSongEntity } from '../../entities/index.js';

export const SaavnGetRecoSchema = {
  albums: {
    params: z.strictObject({
      albumid: PositiveString,
    }),
    response: z.array(SaavnAlbumBase),
  },

  playlists: {
    params: z.strictObject({
      listid: PositiveString,
    }),
    response: z.array(
      SaavnPlaylistBase.extend({
        more_info: z.looseObject({
          firstname: z.string(),
        }),
      }),
    ),
  },

  songs: {
    params: z.strictObject({
      pid: NonEmptyString,
    }),
    response: z.array(z.lazy(() => SaavnSongEntity)),
  },
} as const;
