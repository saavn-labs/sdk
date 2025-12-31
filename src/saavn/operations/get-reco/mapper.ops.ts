import { z } from 'zod';
import { mapSong, parseImageUrls, mapArtist } from '../common.mapper';
import { SaavnGetRecoSchema } from './schema.ops';

export const SaavnGetRecoMapper = {
  albums: (data: z.infer<typeof SaavnGetRecoSchema.albums.response>) => {
    return data.map((album) => ({
      id: album.id,
      type: 'album' as const,
      title: album.title,
      subtitle: album.subtitle,
      description: album.header_desc,
      url: album.perma_url,
      images: parseImageUrls(album.image),
      language: album.language,
      year: parseInt(album.year, 10),
      stats: {
        playCount: parseInt(album.play_count, 10),
      },
      flags: {
        isExplicit: album.explicit_content === '1',
      },
    }));
  },

  playlists: (
    data: z.infer<typeof SaavnGetRecoSchema.playlists.response>,
  ) => {
    return data.map((playlist) => ({
      id: playlist.id,
      type: 'playlist' as const,
      title: playlist.title,
      subtitle: playlist.subtitle,
      url: playlist.perma_url,
      images: parseImageUrls(playlist.image),
      flags: {
        isExplicit: playlist.explicit_content === '1',
      },
      owner: {
        name: playlist.more_info?.firstname,
      },
    }));
  },

  songs: (data: z.infer<typeof SaavnGetRecoSchema.songs.response>) => {
    return data.map(mapSong);
  },
};
