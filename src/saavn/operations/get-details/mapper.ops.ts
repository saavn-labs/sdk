import { z } from 'zod';
import type { Album } from '@/core/models/album';
import type { Artist } from '@/core/models/artist';
import type { Track } from '@/core/models/track';
import type { Image } from '@/core/types/primitives';
import { SaavnGetDetailsSchema } from './schema.ops';
import type { SaavnArtistBase } from '@/saavn/entities/base';
import type { SaavnSongEntity } from '@/saavn/entities';

type SaavnAlbumEntityType = z.infer<
  typeof SaavnGetDetailsSchema.album.response
>;

function parseImageUrls(imageUrl: string): Image[] {
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

function mapArtist(artist: z.infer<typeof SaavnArtistBase>): Artist {
  return {
    id: artist.id,
    type: 'artist',
    name: artist.name,
    url: artist.perma_url,
    images: parseImageUrls(artist.image),
  };
}

function mapTrack(song: z.infer<typeof SaavnSongEntity>): Track {
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

function mapAlbum(data: SaavnAlbumEntityType): Album {
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
    tracks: data.list?.map(mapTrack),
    meta: {
      copyright: data.more_info?.copyright_text,
      labelUrl: data.more_info?.label_url,
    },
  };
}

export const SaavnGetDetailsMapper = {
  album: mapAlbum,
};
