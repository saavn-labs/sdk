import { z } from 'zod';
import { SaavnArtistBase } from './base.js';
import { SaavnAlbumEdgeCase, SaavnPlaylistEdgeCase, SaavnSongEntity } from './index.js';

export const SaavnArtistEntity = z.lazy(() =>
  SaavnArtistBase.omit({
    id: true,
    role: true,
    perma_url: true,
  }).extend({
    artistId: z.string(),
    subtitle: z.string(),
    follower_count: z.string(),
    isVerified: z.boolean(),
    isRadioPresent: z.boolean(),
    dominantLanguage: z.string(),
    dominantType: z.string(),
    bio: z.string(),
    dob: z.string(),
    fb: z.string(),
    twitter: z.string(),
    wiki: z.string(),
    availableLanguages: z.array(z.string()),
    fan_count: z.string(),
    is_followed: z.boolean(),
    topSongs: z.array(z.lazy(() => SaavnSongEntity)),
    topAlbums: z.array(SaavnAlbumEdgeCase),
    topEpisodes: z.array(z.any()),
    dedicated_artist_playlist: z.array(SaavnPlaylistEdgeCase),
    featured_artist_playlist: z.array(SaavnPlaylistEdgeCase),
    singles: z.array(SaavnAlbumEdgeCase),
    latest_release: z.array(
      SaavnAlbumEdgeCase.extend({ description: z.string() }),
    ),
    similarArtists: z.array(z.any()),
    urls: z.looseObject({
      albums: z.string(),
      bio: z.string(),
      comments: z.string(),
      songs: z.string(),
      overview: z.string(),
    }),
  }),
);

export const SaavnArtistSearchEntity = z.looseObject({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  type: z.literal('artist'),
  isRadioPresent: z.boolean(),
  ctr: z.number(),
  description: z.string(),
  position: z.number(),
});
