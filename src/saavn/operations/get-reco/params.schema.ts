import { z } from 'zod';
import { NonEmptyString, PositiveString } from '../../primitives/string';

export const SaavnGetRecoParamsSchemas = {
  album: z.strictObject({
    albumid: PositiveString,
  }),

  playlist: z.strictObject({
    listid: PositiveString,
  }),

  song: z.strictObject({
    pid: NonEmptyString,
  }),
};
