import { SaavnWebRadioMapper } from './mapper.ops';
import { SaavnWebRadioSchema } from './schema.ops';

export const SaavnWebRadio = {
  entityStation: {
    call: 'webradio.createEntityStation',
    schema: SaavnWebRadioSchema.entityStation,
    mapper: SaavnWebRadioMapper.entityStation,
  },

  featuredStation: {
    call: 'webradio.createFeaturedStation',
    schema: SaavnWebRadioSchema.featuredStation,
    mapper: SaavnWebRadioMapper.featuredStation,
  },
  
  songs: {
    call: 'webradio.getSong',
    schema: SaavnWebRadioSchema.songs,
    mapper: SaavnWebRadioMapper.songs,
  },
};
