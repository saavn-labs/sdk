import z from 'zod';
import {
  SaavnAlbumEntity,
  SaavnArtistEntity,
  SaavnPlaylistEntity,
  SaavnSongEntity,
} from '../../entities';

export const SaavnWebAPIResponseSchemas = {
  album: SaavnAlbumEntity,
  artist: SaavnArtistEntity,
  playlist: SaavnPlaylistEntity,
  songs: z.strictObject({
    songs: z.array(SaavnSongEntity),
    modules: z.any(),
  }),
} as const;
