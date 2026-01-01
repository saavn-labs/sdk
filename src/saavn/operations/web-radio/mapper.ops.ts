import { z } from 'zod';
import { mapSong } from '../../common-mapper';
import { SaavnWebRadioSchema } from './schema.ops';
import type { SaavnSongEntity } from '../../entities';

export const SaavnWebRadioMapper = {
  createEntityStation: (
    data: z.infer<typeof SaavnWebRadioSchema.createEntityStation.response>,
  ) => {
    return {
      stationId: data.stationid,
    };
  },

  createFeaturedStation: (
    data: z.infer<typeof SaavnWebRadioSchema.createFeaturedStation.response>,
  ) => {
    return {
      stationId: data.stationid,
    };
  },

  songs: (data: z.infer<typeof SaavnWebRadioSchema.songs.response>) => {
    if ('song' in data && data.song) {
      return {
        stationId: data.stationid,
        songs: [mapSong(data.song as z.infer<typeof SaavnSongEntity>)],
      };
    }

    const songs = Object.entries(data)
      .filter(
        ([key, value]) =>
          key !== 'stationid' &&
          !Number.isNaN(Number(key)) &&
          typeof value === 'object' &&
          value !== null &&
          'song' in value,
      )
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([, value]) =>
        mapSong((value as { song: z.infer<typeof SaavnSongEntity> }).song),
      );

    return {
      stationId: data.stationid,
      songs,
    };
  },
};
