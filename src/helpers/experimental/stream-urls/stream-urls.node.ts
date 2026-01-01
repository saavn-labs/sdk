import crypto from 'node:crypto';

const AUDIO_QUALITIES = [
  { id: '_12', bitrate: '12kbps' },
  { id: '_48', bitrate: '48kbps' },
  { id: '_96', bitrate: '96kbps' },
  { id: '_160', bitrate: '160kbps' },
  { id: '_320', bitrate: '320kbps' },
] as const;

export function generateStreamUrlsNode(encryptedUrl: string) {
  if (!encryptedUrl) return [];

  try {
    const key = Buffer.from('38346591', 'utf8');

    const decipher = crypto.createDecipheriv('des-ecb', key, null);

    decipher.setAutoPadding(true);

    const decrypted =
      decipher.update(encryptedUrl, 'base64', 'utf8') + decipher.final('utf8');

    if (!decrypted) return [];

    return AUDIO_QUALITIES.map((q) => ({
      bitrate: q.bitrate,
      url: decrypted.replace('_96', q.id),
    }));
  } catch {
    return [];
  }
}
