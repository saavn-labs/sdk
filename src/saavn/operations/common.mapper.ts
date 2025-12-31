import { z } from 'zod';
import type { Album } from '@/core/models/album';
import type { Artist } from '@/core/models/artist';
import type { Track } from '@/core/models/track';
import type { Playlist } from '@/core/models/playlist';
import type { Image } from '@/core/types/primitives';
import type { SaavnArtistBase } from '@/saavn/entities/base';
import type {
  SaavnAlbumEntity,
  SaavnArtistEntity,
  SaavnPlaylistEntity,
  SaavnSongEntity,
  SaavnTopSearchesEntity,
  SaavnTrendingAlbum,
  SaavnTrendingPlaylist,
  SaavnTrendingSongEntity,
} from '@/saavn/entities';
import type {
  SaavnAlbumEdgeCase,
  SaavnPlaylistEdgeCase,
} from '@/saavn/entities/extras';


export function parseImageUrls(imageUrl: string): Image[] {
  const resolutions: Array<'50x50' | '150x150' | '500x500'> = [
    '50x50',
    '150x150',
    '500x500',
  ];

  return resolutions.map((resolution) => ({
    url: imageUrl.replace(/150x150/, resolution),
    resolution,
  }));
}

export function mapArtist(artist: z.infer<typeof SaavnArtistBase>): Artist {
  return {
    id: artist.id,
    type: 'artist',
    name: artist.name,
    url: artist.perma_url,
    images: parseImageUrls(artist.image),
  };
}

export function mapSong(song: z.infer<typeof SaavnSongEntity>): Track {
  return {
    id: song.id,
    type: 'track',
    title: song.title,
    subtitle: song.subtitle,
    url: song.perma_url,
    images: parseImageUrls(song.image),
    album: {
      id: song.more_info?.album_id,
      title: song.more_info?.album,
      url: song.more_info?.album_url,
    },
    artists: {
      primary: song.more_info.artistMap.primary_artists?.map(mapArtist),
      featured: song.more_info.artistMap.featured_artists?.map(mapArtist),
      all: song.more_info.artistMap.artists?.map(mapArtist),
    },
    duration: parseInt(song.more_info.duration, 10),
    language: song.language,
    year: parseInt(song.year, 10),
    stats: {
      playCount:
        typeof song.play_count === 'string'
          ? parseInt(song.play_count, 10)
          : song.play_count,
    },
    flags: {
      isExplicit: song.explicit_content === '1',
      hasLyrics: song.more_info?.has_lyrics === 'true',
      isDolby: song.more_info.is_dolby_content,
    },
    lyrics: {
      id: song.more_info?.lyrics_id,
      snippet: song.more_info?.lyrics_snippet,
    },
    media: {
      encryptedUrl: song.more_info?.encrypted_media_url,
      previewUrl: song.more_info?.vlink,
    },
    meta: {
      copyright: song.more_info?.copyright_text,
      label: {
        id: song.more_info?.label_id || undefined,
        name: song.more_info?.label,
        url: song.more_info?.label_url,
      },
      releaseDate: song.more_info?.release_date || undefined,
    },
  };
}

export function mapAlbum(data: z.infer<typeof SaavnAlbumEntity>): Album {
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
      trackCount: parseInt(data.more_info.song_count, 10),
    },
    flags: {
      isExplicit: data.explicit_content === '1',
      isDolby: data.more_info.is_dolby_content,
    },
    artists: {
      primary: data.more_info.artistMap.primary_artists?.map(mapArtist),
      featured: data.more_info.artistMap.featured_artists?.map(mapArtist),
      all: data.more_info.artistMap.artists?.map(mapArtist),
    },
    tracks: data.list?.map(mapSong),
    meta: {
      copyright: data.more_info?.copyright_text,
      labelUrl: data.more_info?.label_url,
    },
  };
}
export function mapPlaylist(
  data: z.infer<typeof SaavnPlaylistEntity>,
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
      trackCount: data.list_count ? parseInt(data.list_count, 10) : undefined,
      followerCount: data.more_info?.follower_count
        ? parseInt(data.more_info.follower_count as string, 10)
        : undefined,
      fanCount: data.more_info?.fan_count
        ? parseInt(data.more_info.fan_count as string, 10)
        : undefined,
    },
    flags: {
      isExplicit: data.explicit_content === '1',
      isDolby: data.more_info?.is_dolby_content,
      isFollowed: data.more_info?.is_followed === 'true',
    },
    tracks: data.list?.map(mapSong),
    artists: data.more_info?.artists?.map(mapArtist),
    owner: {
      id: data.more_info?.uid,
      name: [
        data.more_info?.firstname,
        data.more_info?.lastname,
      ]
        .filter(Boolean)
        .join(' ') || undefined,
    },
    meta: {
      playlistType: data.more_info?.playlist_type as any,
      language: data.language,
      lastUpdated: data.more_info?.last_updated
        ? parseInt(data.more_info.last_updated, 10)
        : undefined,
    },
  };
}

export function mapAlbumEdgeCase(data: z.infer<typeof SaavnAlbumEdgeCase>): Album {
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
      trackCount: data.more_info?.song_count
        ? parseInt(data.more_info.song_count, 10)
        : undefined,
    },
    flags: {
      isExplicit: data.explicit_content === '1',
    },
    artists: {
      primary: data.more_info?.artistMap?.primary_artists?.map(mapArtist),
      featured: data.more_info?.artistMap?.featured_artists?.map(mapArtist),
      all: data.more_info?.artistMap?.artists?.map(mapArtist),
    },
  };
}

export function mapPlaylistEdgeCase(
  data: z.infer<typeof SaavnPlaylistEdgeCase>,
): Playlist {
  return {
    id: data.id,
    type: 'playlist',
    title: data.title,
    subtitle: data.subtitle,
    url: data.perma_url,
    images: parseImageUrls(data.image),
    stats: {
      followerCount: data.more_info?.follower_count
        ? parseInt(data.more_info.follower_count as string, 10)
        : undefined,
      fanCount: data.more_info?.fan_count
        ? parseInt(data.more_info.fan_count as string, 10)
        : undefined,
    },
    flags: {
      isExplicit: data.explicit_content === '1',
      isDolby: data.more_info?.is_dolby_content ?? undefined,
    },
    meta: {
      language: data.more_info?.language,
    },
  };
}

export function mapArtistDetails(
  data: z.infer<typeof SaavnArtistEntity>,
): Artist {
  return {
    id: data.artistId,
    type: 'artist',
    name: data.name,
    subtitle: data.subtitle,
    url: data.wiki ? data.wiki : '',
    images: parseImageUrls(data.image),
    stats: {
      followerCount: data.follower_count
        ? parseInt(data.follower_count, 10)
        : undefined,
      fanCount: data.fan_count ? parseInt(data.fan_count, 10) : undefined,
    },
    flags: {
      isVerified: data.isVerified,
      isRadioPresent: data.isRadioPresent,
    },
    language: {
      primary: data.dominantLanguage,
      available: data.availableLanguages,
    },
    profile: {
      bio: data.bio
        ? [
            {
              text: data.bio,
            },
          ]
        : undefined,
      dob: data.dob || undefined,
    },
    links: {
      saavn: {
        overview: data.urls?.overview,
        albums: data.urls?.albums,
        songs: data.urls?.songs,
        bio: data.urls?.bio,
        comments: data.urls?.comments,
      },
      social: {
        wiki: data.wiki || undefined,
        facebook: data.fb || undefined,
        twitter: data.twitter || undefined,
      },
    },
    tracks: {
      top: data.topSongs?.map(mapSong),
    },
    albums: {
      top: data.topAlbums?.map(mapAlbumEdgeCase),
      singles: data.singles?.map(mapAlbumEdgeCase),
      latest: data.latest_release?.map((album) =>
        mapAlbumEdgeCase(album as any),
      ),
    },
    playlists: {
      dedicated: data.dedicated_artist_playlist?.map(mapPlaylistEdgeCase),
      featured: data.featured_artist_playlist?.map(mapPlaylistEdgeCase),
    },
  };
}

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
      trackCount: data.more_info?.song_count
        ? parseInt(data.more_info.song_count, 10)
        : undefined,
    },
    flags: {
      isExplicit: data.explicit_content === '1',
    },
    artists: {
      primary: data.more_info?.artistMap?.primary_artists?.map(mapArtist),
      featured: data.more_info?.artistMap?.featured_artists?.map(mapArtist),
      all: data.more_info?.artistMap?.artists?.map(mapArtist),
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
      trackCount: data.more_info?.song_count
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
): Track {
  return {
    id: data.id,
    type: 'track',
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
      primary: data.more_info?.artistMap?.primary_artists?.map(mapArtist),
      featured: data.more_info?.artistMap?.featured_artists?.map(mapArtist),
      all: data.more_info?.artistMap?.artists?.map(mapArtist),
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