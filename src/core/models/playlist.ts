import type { EntityId, Image } from '../types/primitives';
import type { Context } from '../types/context';
import type { Artist, Track } from '.';

export interface Playlist {
  id: EntityId;
  type: 'playlist';

  title: string;
  subtitle?: string;
  description?: string;

  url: string;
  images: Image[];

  stats?: {
    trackCount?: number;
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

  tracks?: Track[];
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

  context?: Context;
}
