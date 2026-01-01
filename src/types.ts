import { z } from 'zod';

export type EntityType =
  | 'album'
  | 'artist'
  | 'label'
  | 'playlist'
  | 'show'
  | 'song';

export interface ClientConfig {
  baseUrl: string;
  fetch?: typeof fetch;
  timeoutMs?: number;
}

type ImageResolution = '50x50' | '150x150' | '500x500';
export type Image = {
  url: string;
  resolution: ImageResolution;
};

export type SaavnOperation = {
  call: string;
  schema: {
    params: z.ZodType;
    response: z.ZodType;
  };
};

export interface SaavnPermalinkToken {
  type: EntityType;
  token: string;
}
