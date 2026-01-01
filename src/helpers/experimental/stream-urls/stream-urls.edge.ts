import { fetchFromSaavn } from '@/helpers/fetch';

const AUDIO_QUALITIES = [
  { id: '_12', bitrate: '12kbps' },
  { id: '_48', bitrate: '48kbps' },
  { id: '_96', bitrate: '96kbps' },
  { id: '_160', bitrate: '160kbps' },
  { id: '_320', bitrate: '320kbps' },
] as const;

function normalizeAacUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    url.hostname = url.hostname.replace(/^web\./, 'aac.');
    return url.toString();
  } catch {
    return rawUrl;
  }
}

export async function generateStreamUrlsEdge(encryptedUrl: string) {
  const res = await fetchFromSaavn({
    call: 'song.generateAuthToken',
    params: {
      url: encryptedUrl,
      bitrate: '96',
    },
  });

  if (!res.ok) return [];

  const data = res.data as { auth_url?: string | false };

  if (typeof data.auth_url === 'string') {
    const baseUrl = normalizeAacUrl(data.auth_url.split('?')[0] as string);

    return AUDIO_QUALITIES.map((q) => ({
      bitrate: q.bitrate,
      url: baseUrl.replace('_96', q.id),
    }));
  }

  return [];
}
