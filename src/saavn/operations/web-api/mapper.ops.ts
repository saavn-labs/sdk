import { z } from 'zod';
import { mapAlbum, mapArtist, mapPlaylist, mapSong } from '../../common-mapper.js';
import { SaavnWebAPISchema } from './schema.ops.js';

export const SaavnWebAPIMapper = {
  album: (data: z.infer<typeof SaavnWebAPISchema.album.response>) => {
    return mapAlbum(data);
  },

  artist: (data: z.infer<typeof SaavnWebAPISchema.artist.response>) => {
    return mapArtist(data);
  },

  label: (data: z.infer<typeof SaavnWebAPISchema.label.response>) => {
    // TODO: Implement label mapping
    return data;
  },

  playlist: (data: z.infer<typeof SaavnWebAPISchema.playlist.response>) => {
    return mapPlaylist(data);
  },

  songs: (data: z.infer<typeof SaavnWebAPISchema.songs.response>) => {
    return {
      songs: data.songs.map(mapSong),
    };
  },
};
