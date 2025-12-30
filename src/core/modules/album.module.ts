import { SaavnGetDetailsSchema } from '@/saavn/operations';
import { fetchFromSaavn } from '@/transport/fetch';

export async function getById({ albumId }: { albumId: string }) {
  const { call, paramsSchema, responseSchema } = SaavnGetDetailsSchema.album;

  const userParams = { albumid: albumId };
  const params = paramsSchema.parse(userParams);

  const saavnResponse = await fetchFromSaavn({ call, params });
  if (!saavnResponse.ok) {
    throw new Error(`Failed to fetch album details for ID: ${albumId}`);
  }

  const parsedData = responseSchema.parse(saavnResponse.data);
  return parsedData;
}

// testing
const data = await getById({ albumId: '14430454' });
console.log('Album Data:', data);
