import { SaavnSearchResultsMapper } from './mapper.ops';
import { SaavnSearchResultsSchema } from './schema.ops';

export const SaavnSearchResults = {
  all: {
    call: 'autocomplete.get',
    schema: SaavnSearchResultsSchema.all,
    mapper: SaavnSearchResultsMapper.all,
  },

  albums: {
    call: 'search.getAlbumResults',
    schema: SaavnSearchResultsSchema.albums,
    mapper: SaavnSearchResultsMapper.albums,
  },

  artists: {
    call: 'search.getArtistResults',
    schema: SaavnSearchResultsSchema.artists,
    mapper: SaavnSearchResultsMapper.artists,
  },

  playlists: {
    call: 'search.getPlaylistResults',
    schema: SaavnSearchResultsSchema.playlists,
    mapper: SaavnSearchResultsMapper.playlists,
  },

  songs: {
    call: 'search.getResults',
    schema: SaavnSearchResultsSchema.songs,
    mapper: SaavnSearchResultsMapper.songs,
  },
};
