import { z } from 'zod';
import {
  mapTrendingAlbum,
  mapTrendingPlaylist,
  mapTrendingSong,
} from '../common.mapper';
import { SaavnGetTrendingSchema } from './schema.ops';

export const SaavnGetTrendingMapper = {
  all: (data: z.infer<typeof SaavnGetTrendingSchema.all.response>) => {
    return data.map((item) => {
      if (item.type === 'album') {
        return mapTrendingAlbum(item);
      } else if (item.type === 'playlist') {
        return mapTrendingPlaylist(item);
      } else {
        return mapTrendingSong(item);
      }
    });
  },

  albums: (
    data: z.infer<typeof SaavnGetTrendingSchema.albums.response>,
  ) => {
    return data.map(mapTrendingAlbum);
  },

  playlists: (
    data: z.infer<typeof SaavnGetTrendingSchema.playlists.response>,
  ) => {
    return data.map(mapTrendingPlaylist);
  },

  songs: (data: z.infer<typeof SaavnGetTrendingSchema.songs.response>) => {
    return data.map(mapTrendingSong);
  },
};

