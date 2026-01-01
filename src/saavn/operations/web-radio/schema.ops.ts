import { z } from 'zod';
import {
  JSONStringArray,
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
  .looseObject({
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

const WebRadioError = z.looseObject({
  stationid: z.string().optional(),
  error: z.string(),
});

export const SaavnWebRadioSchema = {
  createEntityStation: {
    params: z.strictObject({
      ctx: z.literal('android'),
      entity_type: z.literal('queue'),
      entity_id: JSONStringArray,
    }),
    response: z.looseObject({
      stationid: z.string(),
    }),
  },

  createFeaturedStation: {
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
    response: z.union([
      WebRadioSingleSong,
      WebRadioMultipleSongs,
      WebRadioError,
    ]),
  },
} as const;
