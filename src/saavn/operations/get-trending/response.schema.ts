import { z } from 'zod';
import {
  SaavnTrendingAlbum,
  SaavnTrendingPlaylist,
  SaavnTrendingSongEntity,
} from '../../entities';

export const SaavnGetTrendingResponseSchemas = {
  all: z.array(
    z.discriminatedUnion('type', [
      SaavnTrendingAlbum,
      SaavnTrendingPlaylist,
      SaavnTrendingSongEntity,
    ]),
  ),
  albums: z.array(SaavnTrendingAlbum),
  playlists: z.array(SaavnTrendingPlaylist),
  songs: z.array(SaavnTrendingSongEntity),
} as const;
