export enum ContextSource {
  Details = 'details',
  Search = 'search',
  Trending = 'trending',
  Recommendation = 'reco',
  Artist = 'artist',
  Playlist = 'playlist',
  Radio = 'radio',
}

export interface Context {
  source: ContextSource;
  position?: number;
  query?: string;
  seedId?: string;
}
