import type { Image } from '../types/primitives';
import type { Context } from '../types/context';
import type { Artist } from '.';

export interface Track {
  id: string;
  type: 'track';

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

  context?: Context;
}
