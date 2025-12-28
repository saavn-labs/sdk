import { SaavnGetTrendingParamsSchemas } from './params.schema';
import { SaavnGetTrendingResponseSchemas } from './response.schema';

export const SaavnGetTrending = {
  all: {
    call: 'content.getTrending',
    params: SaavnGetTrendingParamsSchemas.all,
    response: SaavnGetTrendingResponseSchemas.all,
  },

  albums: {
    call: 'content.getTrending',
    params: SaavnGetTrendingParamsSchemas.albums,
    response: SaavnGetTrendingResponseSchemas.albums,
  },

  playlists: {
    call: 'content.getTrending',
    params: SaavnGetTrendingParamsSchemas.playlists,
    response: SaavnGetTrendingResponseSchemas.playlists,
  },

  songs: {
    call: 'content.getTrending',
    params: SaavnGetTrendingParamsSchemas.songs,
    response: SaavnGetTrendingResponseSchemas.songs,
  },
} as const;

export * from './params.schema';
export * from './response.schema';
