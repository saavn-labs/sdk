import { SaavnGetDetails } from '@/saavn/operations';
import { fetchFromSaavn } from '@/transport/fetch';

export async function getById({ albumId }: { albumId: string }) {
  const { call, schema, mapper } = SaavnGetDetails.album;

  const userParams = { albumid: albumId };
  const params = schema.params.parse(userParams);

  const saavnResponse = await fetchFromSaavn({ call, params });
  if (!saavnResponse.ok) {
    throw new Error(`Failed to fetch album details for ID: ${albumId}`);
  }

  const parsedData = schema.response.parse(saavnResponse.data);
  return mapper(parsedData);
}

// testing
const data = await getById({ albumId: '14430454' });
console.log('Album Data:', data);
