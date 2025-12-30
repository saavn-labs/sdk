import { SaavnGetDetailsSchema } from "./schema.ops";


export const SaavnGetDetails = {
  album: {
    call: 'content.getAlbumDetails',
    schema: SaavnGetDetailsSchema.album,
  },

  artist: {
    call: 'artist.getDetails',
  },

  playlist: {
    call: 'playlist.getDetails',
    schema: SaavnGetDetailsSchema.playlist,
  },

  songs: {
    call: 'song.getDetails',
    schema: SaavnGetDetailsSchema.songs,
  },

  topAlbumsOfTheYear: {
    call: 'content.getTopAlbumsOfTheYear',
    schema: SaavnGetDetailsSchema.topAlbumsOfTheYear,
  },

  topSearches: {
    call: 'content.getTopSearches',
    schema: SaavnGetDetailsSchema.topSearches,
  },
} as const;
