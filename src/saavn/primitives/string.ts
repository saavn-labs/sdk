import { z } from 'zod';

export const NonEmptyString = z.string().min(1);

export const PositiveString = z
  .string()
  .regex(/^[1-9]\d*$/, 'Expected a positive numeric string');

export const CSVString = z
  .string()
  .min(1)
  .refine(
    (v) => v.split(',').every((part) => part.trim().length > 0),
    'Expected comma-separated non-empty values',
  );

export const JSONStringArray = z.string().refine(
  (value) => {
    try {
      const parsed = JSON.parse(value);
      return (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        parsed.every((item) => typeof item === 'string' && item.length > 0)
      );
    } catch {
      return false;
    }
  },
  {
    message: 'Expected a JSON-stringified array of non-empty strings',
  },
);
