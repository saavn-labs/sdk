import { z } from 'zod';
import {
  SaavnAlbumBase,
  SaavnAlbumCore,
  SaavnArtistBase,
  SaavnArtistMap,
} from './base';
import { SaavnPlaylistSearchEntity } from './playlist.entity';

export const SaavnAlbumEdgeCase = SaavnAlbumBase.extend({
  more_info: z.strictObject({
    query: z.string(),
    text: z.string(),
    music: z.string(),
    song_count: z.string(),
    artistMap: SaavnArtistMap,
  }),
});

export const SaavnPlaylistEdgeCase = SaavnPlaylistSearchEntity.omit({
  description: true,
}).extend({
  numsongs: z.null(),
  more_info: SaavnPlaylistSearchEntity.shape.more_info.extend({
    uid: z.string(),
    song_count: z.string(),
  }),
});

export const SaavnSearchAllEntity = SaavnAlbumCore.extend({
  description: z.string(),
  mini_obj: z.boolean(),
  more_info: z.strictObject({
    music: z.string(),
    ctr: z.number(),
    year: z.string(),
    is_movie: z.string(),
    language: z.string(),
    song_pids: z.string(),
  }),
});

export const SaavnTopSearchesEntity = z.strictObject({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.union([z.literal('album'), z.literal('artist'), z.literal('song')]),
  image: z.string(),
  perma_url: z.string(),
  explicit_content: z.string(),
  mini_obj: z.boolean(),
  more_info: z.strictObject({
    album: z.string(),
    artistMap: z.array(SaavnArtistBase),
    is_jiotune_available: z.string().optional(),
  }),
});
