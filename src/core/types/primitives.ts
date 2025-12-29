export type EntityId = string & { readonly __brand: 'EntityId' };
export type SongId = string & { readonly __brand: 'SongId' };

type ImageResolution = '50x50' | '150x150' | '500x500';
export type Image = {
  url: string;
  resolution: ImageResolution;
};
