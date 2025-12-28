import { SaavnGetRecoParamsSchemas } from './params.schema';
import { SaavnGetRecoResponseSchemas } from './response.schema';

export const SaavnGetReco = {
  songs: {
    call: 'reco.getreco',
    params: SaavnGetRecoParamsSchemas.song,
    response: SaavnGetRecoResponseSchemas.songs,
  },

  albums: {
    call: 'reco.getreco',
    params: SaavnGetRecoParamsSchemas.album,
    response: SaavnGetRecoResponseSchemas.albums,
  },

  playlists: {
    call: 'reco.getreco',
    params: SaavnGetRecoParamsSchemas.playlist,
    response: SaavnGetRecoResponseSchemas.playlists,
  },
} as const;

export * from './params.schema';
export * from './response.schema';
