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
    call: 'webradio.createEntityStation',
    paramsSchema: z.strictObject({
      ctx: z.literal('android'),
      entity_type: z.literal('queue'),
      entity_id: JSONArrayString,
    }),
    responseSchema: z.looseObject({
      stationid: z.string(),
    }),
  },
  featuredStation: {
    call: 'webradio.createFeaturedStation',
    paramsSchema: z.strictObject({
      name: NonEmptyString,
      language: NonEmptyString,
    }),
    responseSchema: z.looseObject({
      stationid: z.string(),
    }),
  },

  songs: {
    call: 'webradio.getSong',
    paramsSchema: z.strictObject({
      ctx: z.literal('android'),
      stationid: NonEmptyString,
      k: PositiveString.optional(),
      next: SaavnExplicitFlagSchema.optional(),
    }),
    responseSchema: z.union([WebRadioSingleSong, WebRadioMultipleSongs]),
  },
} as const;
