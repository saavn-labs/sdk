import { SaavnGetSearchResultsParamsSchemas } from './params.schema';
import { SaavnSearchResultsResponseSchemas } from './response.schema';

export const SaavnSearchResults = {
  all: {
    call: 'autocomplete.get',
    params: SaavnGetSearchResultsParamsSchemas.all,
    response: SaavnSearchResultsResponseSchemas.all,
  },

  albums: {
    call: 'search.getAlbumResults',
    params: SaavnGetSearchResultsParamsSchemas.albums,
    response: SaavnSearchResultsResponseSchemas.albums,
  },

  artists: {
    call: 'search.getArtistResults',
    params: SaavnGetSearchResultsParamsSchemas.artists,
    response: SaavnSearchResultsResponseSchemas.artists,
  },

  playlists: {
    call: 'search.getPlaylistResults',
    params: SaavnGetSearchResultsParamsSchemas.playlists,
    response: SaavnSearchResultsResponseSchemas.playlists,
  },

  songs: {
    call: 'search.getResults',
    params: SaavnGetSearchResultsParamsSchemas.songs,
    response: SaavnSearchResultsResponseSchemas.songs,
  },
} as const;

export * from './params.schema';
export * from './response.schema';
