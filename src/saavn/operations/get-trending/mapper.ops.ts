import { z } from 'zod';
import { SaavnGetTrendingSchema } from './schema.ops.js';
import { mapArtistBase, parseImageUrls } from '../../common-mapper.js';
import type { Album, Playlist, Song } from '@/core/models';
import type {
  SaavnTrendingAlbum,
  SaavnTrendingPlaylist,
  SaavnTrendingSongEntity,
} from '@/saavn/entities/index.js';

export function mapTrendingAlbum(
  data: z.infer<typeof SaavnTrendingAlbum>,
): Album {
  return {
    id: data.id,
    type: 'album',
    title: data.title,
    subtitle: data.subtitle,
    description: data.header_desc,
    url: data.perma_url,
    images: parseImageUrls(data.image),
    language: data.language,
    year: parseInt(data.year, 10),
    stats: {
      playCount: parseInt(data.play_count, 10),
      songCount: data.more_info?.song_count
        ? parseInt(data.more_info.song_count, 10)
        : undefined,
    },
    flags: {
      isExplicit: data.explicit_content === '1',
    },
    artists: {
      primary: data.more_info?.artistMap?.primary_artists?.map(mapArtistBase),
      featured: data.more_info?.artistMap?.featured_artists?.map(mapArtistBase),
      all: data.more_info?.artistMap?.artists?.map(mapArtistBase),
    },
    meta: {
      releaseDate: data.more_info?.release_date,
    },
  };
}

export function mapTrendingPlaylist(
  data: z.infer<typeof SaavnTrendingPlaylist>,
): Playlist {
  return {
    id: data.id,
    type: 'playlist',
    title: data.title,
    subtitle: data.subtitle,
    description: data.header_desc,
    url: data.perma_url,
    images: parseImageUrls(data.image),
    stats: {
      songCount: data.more_info?.song_count
        ? parseInt(data.more_info.song_count, 10)
        : undefined,
      followerCount: data.more_info?.follower_count
        ? parseInt(data.more_info.follower_count, 10)
        : undefined,
      fanCount: data.more_info?.fan_count
        ? parseInt(data.more_info.fan_count, 10)
        : undefined,
    },
    flags: {
      isExplicit: data.explicit_content === '1',
      isWeekly: data.more_info?.isWeekly === 'true',
    },
    meta: {
      language: data.language,
    },
  };
}

export function mapTrendingSong(
  data: z.infer<typeof SaavnTrendingSongEntity>,
): Song {
  return {
    id: data.id,
    type: 'song',
    title: data.title,
    subtitle: data.subtitle,
    url: data.perma_url,
    images: parseImageUrls(data.image),
    album: {
      id: data.more_info?.album_id,
      title: data.more_info?.album,
      url: data.more_info?.album_url,
    },
    artists: {
      primary: data.more_info?.artistMap?.primary_artists?.map(mapArtistBase),
      featured: data.more_info?.artistMap?.featured_artists?.map(mapArtistBase),
      all: data.more_info?.artistMap?.artists?.map(mapArtistBase),
    },
    duration: parseInt(data.more_info?.duration || '0', 10),
    language: data.language,
    year: parseInt(data.year, 10),
    stats: {
      playCount: parseInt(data.play_count, 10),
    },
    flags: {
      isExplicit: data.explicit_content === '1',
      hasLyrics: data.more_info?.has_lyrics === 'true',
      isDolby: data.more_info?.is_dolby_content,
    },
    lyrics: {
      id: data.more_info?.lyrics_id,
      snippet: data.more_info?.lyrics_snippet,
    },
    media: {
      encryptedUrl: data.more_info?.encrypted_media_url,
      previewUrl: data.more_info?.vlink,
    },
    meta: {
      copyright: data.more_info?.copyright_text,
      label: {
        id: data.more_info?.label_id || undefined,
        name: data.more_info?.label,
        url: data.more_info?.label_url,
      },
      releaseDate: data.more_info?.release_date || undefined,
    },
  };
}

export const SaavnGetTrendingMapper = {
  all: (data: z.infer<typeof SaavnGetTrendingSchema.all.response>) => {
    return data.map((item) => {
      if (item.type === 'album') {
        return mapTrendingAlbum(item);
      } else if (item.type === 'playlist') {
        return mapTrendingPlaylist(item);
      } else {
        return mapTrendingSong(item);
      }
    });
  },

  albums: (data: z.infer<typeof SaavnGetTrendingSchema.albums.response>) => {
    return data.map(mapTrendingAlbum);
  },

  playlists: (
    data: z.infer<typeof SaavnGetTrendingSchema.playlists.response>,
  ) => {
    return data.map(mapTrendingPlaylist);
  },

  songs: (data: z.infer<typeof SaavnGetTrendingSchema.songs.response>) => {
    return data.map(mapTrendingSong);
  },
};
