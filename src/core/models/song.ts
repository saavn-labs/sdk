import type { Image } from '@/types.js';
import type { Artist } from '.';

export interface Song {
  id: string;
  type: 'song';

  title: string;
  subtitle?: string;

  url: string;
  images: Image[];

  album?: {
    id?: string;
    title?: string;
    url?: string;
  };

  artists?: {
    primary?: Artist[];
    featured?: Artist[];
    all?: Artist[];
  };

  duration?: number;

  language?: string;
  year?: number;

  stats?: {
    playCount?: number;
  };

  flags?: {
    isExplicit?: boolean;
    hasLyrics?: boolean;
    isDolby?: boolean;
  };

  lyrics?: {
    id?: string;
    snippet?: string;
  };

  media?: {
    encryptedUrl?: string;
    previewUrl?: string;

    jiotune?: {
      id: string;
      url: string;
    };
  };

  meta?: {
    copyright?: string;
    label?: {
      id?: string;
      name?: string;
      url?: string;
    };
    releaseDate?: string;
  };
}
