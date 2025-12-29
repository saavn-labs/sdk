import type { EntityId, Image } from '../types/primitives';
import type { Context } from '../types/context';
import type { Album, Playlist, Track } from '.';

interface BioSection {
  title?: string;
  text: string;
  sequence?: number;
}

export interface Artist {
  id: EntityId;
  type: 'artist';

  name: string;
  subtitle?: string;

  url: string;
  images: Image[];

  stats?: {
    followerCount?: number;
    fanCount?: number;
  };

  flags?: {
    isVerified?: boolean;
    isRadioPresent?: boolean;
  };

  language?: {
    primary?: string;
    available?: string[];
  };

  profile?: {
    bio?: BioSection[];
    dob?: string;
  };

  links?: {
    saavn?: {
      overview?: string;
      albums?: string;
      songs?: string;
      bio?: string;
      comments?: string;
    };

    social?: {
      wiki?: string;
      facebook?: string;
      twitter?: string;
    };
  };

  tracks?: {
    top?: Track[];
    latest?: Track[];
  };

  albums?: {
    top?: Album[];
    singles?: Album[];
    latest?: Album[];
  };

  playlists?: {
    dedicated?: Playlist[];
    featured?: Playlist[];
  };

  related?: {
    similar?: Artist[];
  };

  context?: Context;
}
