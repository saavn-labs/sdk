import { SaavnWebAPIParamsSchemas } from './params.schema';
import { SaavnWebAPIResponseSchemas } from './response.schema';

export const SaavnWebAPI = {
  album: {
    call: 'webapi.get',
    params: SaavnWebAPIParamsSchemas.albums,
    response: SaavnWebAPIResponseSchemas.album,
  },

  artist: {
    call: 'webapi.get',
    params: SaavnWebAPIParamsSchemas.artists,
    response: SaavnWebAPIResponseSchemas.artist,
  },

  playlist: {
    call: 'webapi.get',
    params: SaavnWebAPIParamsSchemas.playlists,
    response: SaavnWebAPIResponseSchemas.playlist,
  },

  songs: {
    call: 'webapi.get',
    params: SaavnWebAPIParamsSchemas.songs,
    response: SaavnWebAPIResponseSchemas.songs,
  },
} as const;

export * from './params.schema';
export * from './response.schema';
