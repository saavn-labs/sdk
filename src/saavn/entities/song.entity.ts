import { z } from 'zod';
import {
  SaavnArtistMap,
  SaavnSongCore,
  SaavnSongBase,
  SaavnTrendingBase,
} from './base.js';

export const SaavnSongEntity = SaavnSongBase.extend({
  more_info: z.looseObject({
    music: z.string(),
    album_id: z.string(),
    album: z.string(),
    label: z.string(),
    label_id: z.string().nullable(),
    origin: z.string(),
    is_dolby_content: z.boolean(),
    encrypted_media_url: z.string(),
    encrypted_drm_media_url: z.string(),
    album_url: z.string(),
    duration: z.string(),
    has_lyrics: z.string(),
    lyrics_snippet: z.string(),
    lyrics_id: z.string().optional(),
    copyright_text: z.string(),
    release_date: z.string().nullable(),
    label_url: z.string().optional(),
    vcode: z.string().optional(),
    vlink: z.string().optional(),
    artistMap: z.lazy(() => SaavnArtistMap),
  }),
});

export const SaavnSongSearchEntity = SaavnSongCore.extend({
  description: z.string(),
  more_info: z.looseObject({
    album: z.string(),
    album_id: z.string(),
    ctr: z.number(),
    score: z.string(),
    vcode: z.string(),
    vlink: z.string(),
    primary_artists: z.string(),
    singers: z.string(),
    language: z.string(),
  }),
});

export const SaavnTrendingSongEntity = SaavnTrendingBase.extend({
  type: z.literal('song'),
  more_info: SaavnSongEntity.shape.more_info.extend({
    vcode: z.string().optional(),
    vlink: z.string().optional(),
    label_url: z.string().optional(),
  }),
});
