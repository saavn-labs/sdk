import { z } from 'zod';

export const SaavnAlbumCore = z.looseObject({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.literal('album'),
  image: z.string(),
  perma_url: z.string(),
  explicit_content: z.string(),
});

export const SaavnAlbumBase = SaavnAlbumCore.extend({
  header_desc: z.string(),
  language: z.string(),
  year: z.string(),
  play_count: z.string(),
});

export const SaavnArtistAlbumBase = SaavnAlbumBase.extend({
  more_info: z.looseObject({
    song_count: z.string(),
  }),
});

export const SaavnArtistBase = z.looseObject({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  image: z.string(),
  type: z.literal('artist'),
  perma_url: z.string(),
});

export const SaavnArtistMap = z.looseObject({
  primary_artists: z.array(SaavnArtistBase),
  featured_artists: z.array(SaavnArtistBase),
  artists: z.array(SaavnArtistBase),
});

export const SaavnPlaylistBase = z.looseObject({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.literal('playlist'),
  image: z.string(),
  perma_url: z.string(),
  explicit_content: z.string(),
});

export const SaavnSongCore = z.looseObject({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.literal('song'),
  perma_url: z.string(),
  image: z.string(),
  explicit_content: z.string(),
});

export const SaavnSongBase = SaavnSongCore.extend({
  header_desc: z.string(),
  language: z.string(),
  year: z.string(),
  play_count: z.union([z.string(), z.number()]),
});

export const SaavnTrendingBase = z.looseObject({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  header_desc: z.string(),
  type: z.union([z.literal('album'), z.literal('playlist'), z.literal('song')]),
  perma_url: z.string(),
  image: z.string(),
  language: z.string(),
  year: z.string(),
  play_count: z.string(),
  explicit_content: z.string(),
});
