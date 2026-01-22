import CryptoJS from 'crypto-js';

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
    const key = CryptoJS.enc.Utf8.parse('38346591');

    const decrypted = CryptoJS.DES.decrypt(
      encryptedUrl,
      key,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      },
    );

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) return [];

    return AUDIO_QUALITIES.map((q) => ({
      bitrate: q.bitrate,
      url: decryptedText.replace('_96', q.id),
    }));
  } catch (error) {
    console.error('Decryption failed:', error);
    return [];
  }
}
