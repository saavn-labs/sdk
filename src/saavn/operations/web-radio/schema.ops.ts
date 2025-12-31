import { z } from 'zod';
import {
  JSONArrayString,
  NonEmptyString,
  PositiveString,
} from '../../primitives/string';
import { SaavnExplicitFlagSchema } from '../../primitives/enums';
import { SaavnSongEntity } from '../../entities';

const WebRadioSingleSong = z.looseObject({
  song: SaavnSongEntity,
  stationid: z.string(),
});

const WebRadioMultipleSongs = z
  .object({
    stationid: z.string(),
  })
  .catchall(
    z.looseObject({
      song: SaavnSongEntity,
    }),
  )
  .refine(
    (obj) =>
      Object.keys(obj).some(
        (key) => key !== 'stationid' && !Number.isNaN(Number(key)),
      ),
    {
      message: 'Expected numeric song keys (0,1,2,...)',
    },
  );

export const SaavnWebRadioSchema = {
  entityStation: {
    params: z.strictObject({
      ctx: z.literal('android'),
      entity_type: z.literal('queue'),
      entity_id: JSONArrayString,
    }),
    response: z.looseObject({
      stationid: z.string(),
    }),
  },
  
  featuredStation: {
    params: z.strictObject({
      name: NonEmptyString,
      language: NonEmptyString,
    }),
    response: z.looseObject({
      stationid: z.string(),
    }),
  },

  songs: {
    params: z.strictObject({
      ctx: z.literal('android'),
      stationid: NonEmptyString,
      k: PositiveString.optional(),
      next: SaavnExplicitFlagSchema.optional(),
    }),
    response: z.union([WebRadioSingleSong, WebRadioMultipleSongs]),
  },
} as const;
