import { SaavnGetDetailsParamsSchemas } from './params.schema';
import { SaavnGetDetailsResponseSchemas } from './response.schema';

export const SaavnGetDetails = {
  song: {
    call: 'song.getDetails',
    params: SaavnGetDetailsParamsSchemas.song,
    response: SaavnGetDetailsResponseSchemas.songs,
  },

  album: {
    call: 'album.getDetails',
    params: SaavnGetDetailsParamsSchemas.album,
    response: SaavnGetDetailsResponseSchemas.album,
  },

  artist: {
    call: 'artist.getDetails',
    params: SaavnGetDetailsParamsSchemas.artist,
    response: SaavnGetDetailsResponseSchemas.artist,
  },

  playlist: {
    call: 'playlist.getDetails',
    params: SaavnGetDetailsParamsSchemas.playlist,
    response: SaavnGetDetailsResponseSchemas.playlist,
  },

  topAlbumsOfTheYear: {
    call: 'content.getTopAlbumsOfTheYear',
    params: SaavnGetDetailsParamsSchemas.topAlbumsOfTheYear,
    response: SaavnGetDetailsResponseSchemas.topAlbumsOfTheYear,
  },

  topSearches: {
    call: 'content.getTopSearches',
    params: SaavnGetDetailsParamsSchemas.topSearches,
    response: SaavnGetDetailsResponseSchemas.topSearches,
  },
} as const;
