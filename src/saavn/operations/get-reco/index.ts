import { SaavnGetRecoMapper } from './mapper.ops';
import { SaavnGetRecoSchema } from './schema.ops';

export const SaavnGetReco = {
  albums: {
    call: 'reco.getAlbumReco',
    schema: SaavnGetRecoSchema.albums,
    mapper: SaavnGetRecoMapper.albums,
  },

  playlists: {
    call: 'reco.getPlaylistReco',
    schema: SaavnGetRecoSchema.playlists,
    mapper: SaavnGetRecoMapper.playlists,
  },

  songs: {
    call: 'reco.getreco',
    schema: SaavnGetRecoSchema.songs,
    mapper: SaavnGetRecoMapper.songs,
  },
};
