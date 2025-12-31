import { z } from 'zod';
import {
  mapAlbumEdgeCase,
  mapPlaylistEdgeCase,
  mapSong,
  mapArtist,
  parseImageUrls,
} from '../common.mapper';
import { SaavnSearchResultsSchema } from './schema.ops';

export const SaavnSearchResultsMapper = {
  all: (data: z.infer<typeof SaavnSearchResultsSchema.all.response>) => {
    return {
      albums: {
        position: data.albums.position,
        data: data.albums.data.map((album) => ({
          id: album.id,
          type: 'album' as const,
          title: album.title,
          subtitle: album.subtitle,
          description: album.description,
          url: album.perma_url,
          images: parseImageUrls(album.image),
          flags: {
            isExplicit: album.explicit_content === '1',
          },
        })),
      },
      artists: {
        position: data.artists.position,
        data: data.artists.data.map((artist) => ({
          id: artist.id,
          type: 'artist' as const,
          name: artist.title,
          url: artist.perma_url,
          images: parseImageUrls(artist.image),
          flags: {
            isRadioPresent: artist.isRadioPresent,
          },
        })),
      },
      playlists: {
        position: data.playlists.position,
        data: data.playlists.data.map((playlist) => ({
          id: playlist.id,
          type: 'playlist' as const,
          title: playlist.title,
          subtitle: playlist.subtitle,
          description: playlist.description,
          url: playlist.perma_url,
          images: parseImageUrls(playlist.image),
          flags: {
            isExplicit: playlist.explicit_content === '1',
          },
        })),
      },
      songs: {
        position: data.songs.position,
        data: data.songs.data.map((song) => ({
          id: song.id,
          type: 'track' as const,
          title: song.title,
          subtitle: song.subtitle,
          description: song.description,
          url: song.perma_url,
          images: parseImageUrls(song.image),
          flags: {
            isExplicit: song.explicit_content === '1',
          },
        })),
      },
      shows: {
        position: data.shows.position,
        data: data.shows.data.map((show) => ({
          id: show.id,
          type: 'show' as const,
          title: show.title,
          subtitle: show.subtitle,
          description: show.description,
          url: show.perma_url,
          images: parseImageUrls(show.image),
        })),
      },
      topquery: {
        position: data.topquery.position,
        data: data.topquery.data.map((song) => ({
          id: song.id,
          type: 'track' as const,
          title: song.title,
          subtitle: song.subtitle,
          description: song.description,
          url: song.perma_url,
          images: parseImageUrls(song.image),
          flags: {
            isExplicit: song.explicit_content === '1',
          },
        })),
      },
    };
  },

  albums: (
    data: z.infer<typeof SaavnSearchResultsSchema.albums.response>,
  ) => {
    return {
      total: data.total,
      start: data.start,
      results: data.results.map(mapAlbumEdgeCase),
    };
  },

  artists: (
    data: z.infer<typeof SaavnSearchResultsSchema.artists.response>,
  ) => {
    return {
      total: data.total,
      start: data.start,
      results: data.results.map((artist) => ({
        ...mapArtist(artist),
        flags: {
          isRadioPresent: artist.isRadioPresent,
          isFollowed: artist.is_followed,
        },
      })),
    };
  },

  playlists: (
    data: z.infer<typeof SaavnSearchResultsSchema.playlists.response>,
  ) => {
    return {
      total: data.total,
      start: data.start,
      results: data.results.map(mapPlaylistEdgeCase),
    };
  },

  songs: (
    data: z.infer<typeof SaavnSearchResultsSchema.songs.response>,
  ) => {
    return {
      total: data.total,
      start: data.start,
      results: data.results.map(mapSong),
    };
  },
};

