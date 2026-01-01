import { SaavnWebRadioMapper } from './mapper.ops';
import { SaavnWebRadioSchema } from './schema.ops';

export const SaavnWebRadio = {
  createEntityStation: {
    call: 'webradio.createEntityStation',
    schema: SaavnWebRadioSchema.createEntityStation,
    mapper: SaavnWebRadioMapper.createEntityStation,
  },

  createFeaturedStation: {
    call: 'webradio.createFeaturedStation',
    schema: SaavnWebRadioSchema.createFeaturedStation,
    mapper: SaavnWebRadioMapper.createFeaturedStation,
  },

  songs: {
    call: 'webradio.getSong',
    schema: SaavnWebRadioSchema.songs,
    mapper: SaavnWebRadioMapper.songs,
  },
};
