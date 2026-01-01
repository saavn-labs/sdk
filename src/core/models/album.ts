import type { Image } from '@/types';
import type { Artist, Song } from '.';

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
    songCount?: number;
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

  songs?: Song[];

  meta?: {
    copyright?: string;
    labelUrl?: string;
    releaseDate?: string;
  };
}
