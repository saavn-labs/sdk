export { ArtistModule as Artist } from './core/modules/artist.module.js';
export { AlbumModule as Album } from './core/modules/album.module.js';
export { SongModule as Song } from './core/modules/song.module.js';
export { PlaylistModule as Playlist } from './core/modules/playlist.module.js';
export { ExtrasModule as Extras } from './core/modules/extras.module.js';

export { SDKError } from './helpers/errors.js';
export type { SDKErrorCode } from './helpers/errors.js';
export { fetchFromSaavn } from "./helpers/fetch.js"; 

export * from './core/models/index.js';

export { schemas, type Schemas } from './schemas/index.js';

export type {
  EntityType,
  ClientConfig,
  Image,
  SaavnPermalinkToken,
} from './types.js';
