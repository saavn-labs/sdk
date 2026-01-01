export { ArtistModule as Artist } from '@/core/modules/artist.module';
export { AlbumModule as Album } from '@/core/modules/album.module';
export { SongModule as Song } from '@/core/modules/song.module';
export { PlaylistModule as Playlist } from '@/core/modules/playlist.module';
export { ExtrasModule as Extras } from '@/core/modules/extras.module';

export { SDKError } from '@/helpers/errors';
export type { SDKErrorCode } from '@/helpers/errors';

export * from '@/core/models';

export { schemas, type Schemas } from '@/schemas';

export type {
  EntityType,
  ClientConfig,
  Image,
  SaavnPermalinkToken,
} from '@/types';
