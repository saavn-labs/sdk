import { z } from 'zod';

export type EntityType = 'album' | 'artist' | 'playlist' | 'show' | 'song';

export interface ClientConfig {
  baseUrl: string;
  fetch?: typeof fetch;
  timeoutMs?: number;
}

export type SaavnOperation = {
  call: string;
  paramsSchema: z.ZodType;
  responseSchema: z.ZodType;
};

export interface SaavnURLToken {
  type: EntityType;
  token: string;
}
