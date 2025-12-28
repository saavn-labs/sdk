import { z } from 'zod';
import {
  SaavnAlbumEntity,
  SaavnArtistEntity,
  SaavnPlaylistEntity,
  SaavnSongEntity,
  SaavnTopSearchesEntity,
} from '../../entities/index';

export const SaavnGetDetailsResponseSchemas = {
  album: SaavnAlbumEntity,
  artist: SaavnArtistEntity,
  playlist: SaavnPlaylistEntity,
  songs: z.strictObject({
    songs: z.array(SaavnSongEntity),
  }),
  topAlbumsOfTheYear: z.array(SaavnAlbumEntity),
  topSearches: z.array(SaavnTopSearchesEntity),
} as const;
