import { z } from 'zod';
import { SaavnAlbumBase, SaavnArtistMap, SaavnTrendingBase } from './base';
import { SaavnSongEntity } from './song.entity';

export const SaavnAlbumEntity = z.lazy(() =>
  SaavnAlbumBase.extend({
    language: z.string(),
    year: z.string(),
    list_count: z.string(),
    list_type: z.literal('song'),
    list: z.array(z.lazy(() => SaavnSongEntity)),
    modules: z.any(),
    more_info: z.strictObject({
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
  more_info: z.strictObject({
    release_date: z.string(),
    song_count: z.string(),
    artistMap: SaavnArtistMap,
  }),
});
