import { z } from 'zod';

/**
 * Non-empty string.
 * Used for IDs, tokens, slugs, etc.
 */
export const NonEmptyString = z.string().min(1);

/**
 * Positive number represented as string.
 * Saavn uses numbers-as-strings everywhere.
 */
export const PositiveString = z
  .string()
  .regex(/^[1-9]\d*$/, 'Expected a positive numeric string');

/**
 * Comma-separated values.
 * IDs can be numeric or alphanumeric.
 */
export const CSVString = z
  .string()
  .min(1)
  .refine(
    (v) => v.split(',').every((part) => part.trim().length > 0),
    'Expected comma-separated non-empty values',
  );

/** JSON-stringified array of non-empty strings.
 */
export const JSONArrayString = z.string().refine(
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
