import { z } from 'zod';
import {
  mapAlbum,
  mapArtist,
  mapPlaylist,
  mapSong,
  parseImageUrls,
} from '../../common-mapper';
import { SaavnGetDetailsSchema } from './schema.ops';

export const SaavnGetDetailsMapper = {
  album: (data: z.infer<typeof SaavnGetDetailsSchema.album.response>) => {
    return mapAlbum(data);
  },

  artist: (data: z.infer<typeof SaavnGetDetailsSchema.artist.response>) => {
    return mapArtist(data);
  },

  playlist: (data: z.infer<typeof SaavnGetDetailsSchema.playlist.response>) => {
    return mapPlaylist(data);
  },

  songs: (data: z.infer<typeof SaavnGetDetailsSchema.songs.response>) => {
    return {
      songs: data.songs.map(mapSong),
    };
  },

  topAlbumsOfTheYear: (
    data: z.infer<typeof SaavnGetDetailsSchema.topAlbumsOfTheYear.response>,
  ) => {
    return data.map(mapAlbum);
  },

  topSearches: (
    data: z.infer<typeof SaavnGetDetailsSchema.topSearches.response>,
  ) => {
    return data.map((item) => {
      const baseItem = {
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        url: item.perma_url,
        images: parseImageUrls(item.image),
        type: item.type,
      };

      if (item.type === 'album') {
        return {
          ...baseItem,
          type: 'album' as const,
          album: item.more_info?.album,
        };
      } else if (item.type === 'artist') {
        return {
          ...baseItem,
          type: 'artist' as const,
        };
      } else if (item.type === 'song') {
        return {
          ...baseItem,
          type: 'song' as const,
          album: item.more_info?.album,
        };
      }

      return baseItem;
    });
  },
};
