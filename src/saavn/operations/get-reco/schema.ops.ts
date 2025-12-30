import { z } from 'zod';
import { NonEmptyString, PositiveString } from '../../primitives/string';
import { SaavnAlbumBase, SaavnPlaylistBase } from '../../entities/base';
import { SaavnSongEntity } from '../../entities';

export const SaavnGetRecoSchema = {
  albums: {
    call: 'reco.getreco',
    paramsSchema: z.strictObject({
      albumid: PositiveString,
    }),
    responseSchema: z.array(SaavnAlbumBase),
  },

  playlists: {
    call: 'reco.getreco',
    paramsSchema: z.strictObject({
      listid: PositiveString,
    }),
    responseSchema: z.array(
      SaavnPlaylistBase.extend({
        more_info: z.looseObject({
          firstname: z.string(),
        }),
      }),
    ),
  },

  songs: {
    call: 'reco.getreco',
    paramsSchema: z.strictObject({
      pid: NonEmptyString,
    }),
    responseSchema: z.array(z.lazy(() => SaavnSongEntity)),
  },
} as const;
