import { SDKError, experimentalError } from '@/helpers/errors';
import { generateStreamUrlsNode } from './stream-urls.node';
import { generateStreamUrlsEdge } from './stream-urls.edge';

export type Runtime = 'node' | 'edge';

/**
 * ⚠️ EXPERIMENTAL
 *
 * Generates direct download links for a song.
 *
 * This API behaves differently depending on runtime:
 * - `node`: uses local DES-ECB decryption via Node crypto
 * - `edge`: uses Saavn's undocumented internal API
 *
 * Runtime must be specified explicitly.
 *
 * @param encryptedUrl - Encrypted media URL
 * @param options - { runtime: 'node' | 'edge', acknowledge: boolean } to acknowledge experimental nature
 * @returns Stream URL
 */
export async function fetchStreamUrls(
  encryptedUrl: string,
  runtime: Runtime,
  acknowledge: boolean,
): Promise<Array<{ bitrate: string; url: string }>> {
  if (!encryptedUrl) return [];

  if (acknowledge !== true) {
    throw experimentalError(
      'Stream URL generation is experimental and requires explicit acknowledgment.',
    );
  }

  switch (runtime) {
    case 'node':
      return generateStreamUrlsNode(encryptedUrl);

    case 'edge':
      return generateStreamUrlsEdge(encryptedUrl);

    default:
      throw new SDKError(
        'UNSUPPORTED_RUNTIME',
        `Unsupported runtime: ${String(runtime)}`,
      );
  }
}
