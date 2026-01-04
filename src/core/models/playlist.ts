import type { Image } from '@/types.js';
import type { Artist, Song } from '.';

export interface Playlist {
  id: string;
  type: 'playlist';

  title: string;
  subtitle?: string;
  description?: string;

  url: string;
  images: Image[];

  stats?: {
    songCount?: number;
    followerCount?: number;
    fanCount?: number;
    duration?: string;
  };

  flags?: {
    isExplicit?: boolean;
    isWeekly?: boolean;
    isDolby?: boolean;
    isFollowed?: boolean;
  };

  songs?: Song[];
  artists?: Artist[];

  owner?: {
    id?: string;
    name?: string;
    isOfficial?: boolean;
  };

  meta?: {
    playlistType?: 'chart' | 'editorial' | 'radio' | 'user';
    language?: string;
    lastUpdated?: number;
  };
}
