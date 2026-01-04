import { z } from 'zod';
import { SaavnArtistBase, SaavnPlaylistBase, SaavnTrendingBase } from './base.js';
import { SaavnSongEntity } from './song.entity.js';

export const SaavnPlaylistEntity = z.lazy(() =>
  SaavnPlaylistBase.extend({
    header_desc: z.string(),
    language: z.string(),
    year: z.string(),
    play_count: z.string(),
    list_count: z.string(),
    list_type: z.string(),
    list: z.array(z.lazy(() => SaavnSongEntity)),
    more_info: z.looseObject({
      uid: z.string(),
      contents: z.string(),
      is_dolby_content: z.boolean(),
      last_updated: z.string(),
      username: z.string(),
      firstname: z.string(),
      lastname: z.string(),
      is_followed: z.string(),
      follower_count: z.string(),
      fan_count: z.string(),
      playlist_type: z.string(),
      images: z.array(z.any()),
      user_image: z.string(),
      initials: z.string(),
      custom_username: z.string(),
      video_count: z.string(),
      artists: z.array(SaavnArtistBase),
      subtitle_desc: z.array(z.string()),
    }),
  }),
);

export const SaavnPlaylistSearchEntity = SaavnPlaylistBase.extend({
  description: z.string(),
  more_info: z.looseObject({
    firstname: z.string(),
    lastname: z.string().optional(),
    artist_name: z.array(z.string()).nullable(),
    entity_type: z.string(),
    is_dolby_content: z.boolean().nullable(),
    language: z.string(),
  }),
});

export const SaavnTrendingPlaylist = SaavnTrendingBase.extend({
  type: z.literal('playlist'),
  more_info: z.looseObject({
    listid: z.string(),
    isWeekly: z.string(),
    listname: z.string(),
    firstname: z.string(),
    song_count: z.string(),
    follower_count: z.string(),
    fan_count: z.string(),
  }),
});
