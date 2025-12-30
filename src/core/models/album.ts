import type { Image } from '../types/primitives';
import type { Context } from '../types/context';
import type { Artist, Track } from '.';

export interface Album {
  id: string;
  type: 'album';

  title: string;
  subtitle?: string;
  description?: string;

  url: string;
  images: Image[];

  language?: string;
  year?: number;

  stats?: {
    playCount?: number;
    trackCount?: number;
  };

  flags?: {
    isExplicit?: boolean;
    isDolby?: boolean;
  };

  artists?: {
    primary: Artist[];
    featured: Artist[];
    all: Artist[];
  };

  tracks?: Track[];

  meta?: {
    copyright?: string;
    labelUrl?: string;
    releaseDate?: string;
  };

  context?: Context;
}
