import { z } from 'zod';
import {
  mapAlbumEdgeCase,
  mapPlaylistEdgeCase,
  mapSong,
  mapArtistBase,
  mapSearchAllBase,
} from '../../common-mapper.js';
import { SaavnSearchResultsSchema } from './schema.ops.js';

function normalizeSection(section?: { position: number; data: any[] }) {
  return {
    position: section?.position ?? 0,
    data: section?.data ?? [],
  };
}

function normalizeTopQuery(topquery: unknown) {
  if (!topquery || Array.isArray(topquery)) {
    return { position: 0, data: [] };
  }
  return {
    position: (topquery as any).position ?? 0,
    data: (topquery as any).data ?? [],
  };
}

export const SaavnSearchResultsMapper = {
  all: (data: z.infer<typeof SaavnSearchResultsSchema.all.response>) => {
    const albums = normalizeSection(data.albums);
    const artists = normalizeSection(data.artists);
    const playlists = normalizeSection(data.playlists);
    const songs = normalizeSection(data.songs);
    const shows = normalizeSection(data.shows);
    const topquery = normalizeTopQuery(data.topquery);

    return {
      albums: {
        position: albums.position,
        data: albums.data.map(mapSearchAllBase).filter(Boolean),
      },

      artists: {
        position: artists.position,
        data: artists.data.map(mapSearchAllBase).filter(Boolean),
      },

      playlists: {
        position: playlists.position,
        data: playlists.data.map(mapSearchAllBase).filter(Boolean),
      },

      shows: {
        position: shows.position,
        data: shows.data.map(mapSearchAllBase).filter(Boolean),
      },

      songs: {
        position: songs.position,
        data: songs.data.map(mapSearchAllBase).filter(Boolean),
      },

      topquery: {
        position: topquery.position,
        data: topquery.data.map(mapSearchAllBase).filter(Boolean),
      },
    };
  },

  albums: (data: z.infer<typeof SaavnSearchResultsSchema.albums.response>) => ({
    total: data.total,
    start: data.start,
    results: data.results.map(mapAlbumEdgeCase),
  }),

  artists: (
    data: z.infer<typeof SaavnSearchResultsSchema.artists.response>,
  ) => ({
    total: data.total,
    start: data.start,
    results: data.results.map((artist) => ({
      ...mapArtistBase(artist),
      flags: {
        isRadioPresent: artist.isRadioPresent,
        isFollowed: artist.is_followed,
      },
    })),
  }),

  playlists: (
    data: z.infer<typeof SaavnSearchResultsSchema.playlists.response>,
  ) => ({
    total: data.total,
    start: data.start,
    results: data.results.map(mapPlaylistEdgeCase),
  }),

  songs: (data: z.infer<typeof SaavnSearchResultsSchema.songs.response>) => ({
    total: data.total,
    start: data.start,
    results: data.results.map(mapSong),
  }),
};
