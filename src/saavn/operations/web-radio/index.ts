import { SaavnWebRadioMapper } from './mapper.ops.js';
import { SaavnWebRadioSchema } from './schema.ops.js';

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
