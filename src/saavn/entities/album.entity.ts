import { z } from 'zod';
import { SaavnAlbumBase, SaavnArtistMap, SaavnTrendingBase } from './base.js';
import { SaavnSongEntity } from './song.entity.js';

export const SaavnAlbumEntity = z.lazy(() =>
  SaavnAlbumBase.extend({
    language: z.string(),
    year: z.string(),
    list_count: z.string(),
    list_type: z.literal('song'),
    list: z.array(z.lazy(() => SaavnSongEntity)),
    more_info: z.looseObject({
      song_count: z.string(),
      copyright_text: z.string(),
      is_dolby_content: z.boolean(),
      label_url: z.string(),
      artistMap: SaavnArtistMap,
    }),
  }),
);

export const SaavnTrendingAlbum = SaavnTrendingBase.extend({
  type: z.literal('album'),
  more_info: z.looseObject({
    release_date: z.string(),
    song_count: z.string(),
    artistMap: SaavnArtistMap,
  }),
});
