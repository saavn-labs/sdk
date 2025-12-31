import { z } from 'zod';
import { mapSong } from '../common.mapper';
import { SaavnWebRadioSchema } from './schema.ops';
import type { SaavnSongEntity } from '../../entities';

export const SaavnWebRadioMapper = {
  entityStation: (
    data: z.infer<typeof SaavnWebRadioSchema.entityStation.response>,
  ) => {
    return {
      stationId: data.stationid,
    };
  },

  featuredStation: (
    data: z.infer<typeof SaavnWebRadioSchema.featuredStation.response>,
  ) => {
    return {
      stationId: data.stationid,
    };
  },

  songs: (data: z.infer<typeof SaavnWebRadioSchema.songs.response>) => {
    // Handle both single song and multiple songs response
    if ('song' in data && data.song) {
      // Single song response
      return {
        stationId: data.stationid,
        songs: [mapSong(data.song as z.infer<typeof SaavnSongEntity>)],
      };
    } else {
      // Multiple songs response - extract numeric keys
      const songs = Object.keys(data)
        .filter((key) => key !== 'stationid' && !isNaN(Number(key)))
        .sort((a, b) => Number(a) - Number(b))
        .map((key) => {
          const item = data[key as keyof typeof data];
          if (typeof item === 'object' && item !== null && 'song' in item) {
            return mapSong(item.song as z.infer<typeof SaavnSongEntity>);
          }
          return null;
        })
        .filter((song): song is NonNullable<typeof song> => song !== null);

      return {
        stationId: data.stationid,
        songs,
      };
    }
  },
};


