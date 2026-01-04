import { SaavnGetDetailsMapper } from './mapper.ops.js';
import { SaavnGetDetailsSchema } from './schema.ops.js';

export const SaavnGetDetails = {
  album: {
    call: 'content.getAlbumDetails',
    schema: SaavnGetDetailsSchema.album,
    mapper: SaavnGetDetailsMapper.album,
  },

  artist: {
    call: 'artist.getArtistPageDetails',
    schema: SaavnGetDetailsSchema.artist,
    mapper: SaavnGetDetailsMapper.artist,
  },

  playlist: {
    call: 'playlist.getDetails',
    schema: SaavnGetDetailsSchema.playlist,
    mapper: SaavnGetDetailsMapper.playlist,
  },

  songs: {
    call: 'song.getDetails',
    schema: SaavnGetDetailsSchema.songs,
    mapper: SaavnGetDetailsMapper.songs,
  },

  topAlbumsOfTheYear: {
    call: 'content.getTopAlbumsOfTheYear',
    schema: SaavnGetDetailsSchema.topAlbumsOfTheYear,
    mapper: SaavnGetDetailsMapper.topAlbumsOfTheYear,
  },

  topSearches: {
    call: 'content.getTopSearches',
    schema: SaavnGetDetailsSchema.topSearches,
    mapper: SaavnGetDetailsMapper.topSearches,
  },
} as const;
