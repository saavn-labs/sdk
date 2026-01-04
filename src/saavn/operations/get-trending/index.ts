import { SaavnGetTrendingMapper } from './mapper.ops.js';
import { SaavnGetTrendingSchema } from './schema.ops.js';

export const SaavnGetTrending = {
  all: {
    call: 'content.getTrending',
    schema: SaavnGetTrendingSchema.all,
    mapper: SaavnGetTrendingMapper.all,
  },

  albums: {
    call: 'content.getTrending',
    schema: SaavnGetTrendingSchema.albums,
    mapper: SaavnGetTrendingMapper.albums,
  },

  playlists: {
    call: 'content.getTrending',
    schema: SaavnGetTrendingSchema.playlists,
    mapper: SaavnGetTrendingMapper.playlists,
  },

  songs: {
    call: 'content.getTrending',
    schema: SaavnGetTrendingSchema.songs,
    mapper: SaavnGetTrendingMapper.songs,
  },
};
