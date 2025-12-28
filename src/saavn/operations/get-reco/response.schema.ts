import { z } from 'zod';
import { SaavnAlbumBase, SaavnPlaylistBase } from '../../entities/base';
import { SaavnSongEntity } from '../../entities';

export const SaavnGetRecoResponseSchemas = {
  albums: z.array(
    z.lazy(() =>
      SaavnAlbumBase.extend({
        more_info: z.object({
          mini_obj: z.string(),
        }),
      }),
    ),
  ),

  playlists: z.array(
    SaavnPlaylistBase.extend({
      mini_obj: z.boolean(),
      more_info: z.strictObject({
        firstname: z.string(),
      }),
    }),
  ),

  songs: z.array(z.lazy(() => SaavnSongEntity)),
} as const;
