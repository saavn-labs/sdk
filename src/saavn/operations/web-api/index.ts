import { SaavnWebAPIMapper } from './mapper.ops';
import { SaavnWebAPISchema } from './schema.ops';

export const SaavnWebAPI = {
  album: {
    call: 'webapi.get',
    schema: SaavnWebAPISchema.album,
    mapper: SaavnWebAPIMapper.album,
  },

  artist: {
    call: 'webapi.get',
    schema: SaavnWebAPISchema.artist,
    mapper: SaavnWebAPIMapper.artist,
  },

  label: {
    call: 'webapi.get',
    schema: SaavnWebAPISchema.label,
    mapper: SaavnWebAPIMapper.label,
  },
  
  playlist: {
    call: 'webapi.get',
    schema: SaavnWebAPISchema.playlist,
    mapper: SaavnWebAPIMapper.playlist,
  },
  
  songs: {
    call: 'webapi.get',
    schema: SaavnWebAPISchema.songs,
    mapper: SaavnWebAPIMapper.songs,
  },
};
