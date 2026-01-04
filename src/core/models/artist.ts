import type { Image } from '@/types.js';
import type { Album, Playlist, Song } from '.';

export interface BioSection {
  title: string;
  text: string;
  sequence: number;
}

export interface Artist {
  id: string;
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

  songs?: {
    top?: Song[];
    latest?: Song[];
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
}
