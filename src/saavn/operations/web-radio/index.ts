import { SaavnWebRadioParamsSchemas } from './params.schema';
import { SaavnWebRadioResponseSchemas } from './response.schema';

export const SaavnWebRadio = {
  featuredStation: {
    call: 'webradio.createFeaturedStation',
    params: SaavnWebRadioParamsSchemas.featuredStation,
    response: SaavnWebRadioResponseSchemas.featuredStation,
  },

  entityStation: {
    call: 'webradio.createEntityStation',
    params: SaavnWebRadioParamsSchemas.entityStation,
    response: SaavnWebRadioResponseSchemas.entityStation,
  },

  songs: {
    call: 'webradio.getSong',
    params: SaavnWebRadioParamsSchemas.songs,
    response: SaavnWebRadioResponseSchemas.songs,
  },
} as const;

export * from './params.schema';
export * from './response.schema';
