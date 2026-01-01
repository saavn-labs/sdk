/**
 * Error utilities for @saavn-labs/sdk
 * @module errors
 * @internal
 */

import { ZodError } from 'zod';

export type SDKErrorCode =
  | 'INVALID_PARAMS'
  | 'INVALID_RESPONSE'
  | 'API_ERROR'
  | 'NETWORK_ERROR'
  | 'UNSUPPORTED_RUNTIME'
  | 'EXPERIMENTAL_FEATURE'
  | 'INTERNAL_ERROR';

export class SDKError extends Error {
  readonly code: SDKErrorCode;
  readonly details?: unknown;
  override cause?: unknown;

  constructor(
    code: SDKErrorCode,
    message: string,
    options?: {
      details?: unknown;
      cause?: unknown;
    },
  ) {
    super(message);
    this.name = 'SDKError';
    this.code = code;
    this.details = options?.details;
    this.cause = options?.cause;
  }
}

export function fromZodError(
  error: ZodError,
  kind: 'params' | 'response',
  context?: string,
): SDKError {
  return new SDKError(
    kind === 'params' ? 'INVALID_PARAMS' : 'INVALID_RESPONSE',
    `Invalid ${kind}${context ? ` for ${context}` : ''}.`,
    {
      details: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
      cause: error,
    },
  );
}

export function networkError(context?: string, status?: number): SDKError {
  return new SDKError(
    'NETWORK_ERROR',
    `Request failed${context ? ` for ${context}` : ''}.`,
    {
      details: status ? { status } : undefined,
    },
  );
}

export function experimentalError(message?: string): SDKError {
  return new SDKError(
    'EXPERIMENTAL_FEATURE',
    message ??
      'This feature is experimental and requires explicit user acknowledgment.',
  );
}

export function internalError(
  message = 'An internal error occurred.',
  cause?: unknown,
): SDKError {
  return new SDKError('INTERNAL_ERROR', message, { cause });
}

/**
 * Detect unusable API responses before schema validation.
 * Returns a user-friendly message or null if response looks valid.
 */
export function detectSaavnApiError(data: unknown): string | null {
  if (data == null) {
    return 'Empty response from Saavn API.';
  }

  if (data === '' || data === false) {
    return 'Invalid response from Saavn API.';
  }

  if (Array.isArray(data) && data.length === 0) {
    return 'No data returned from Saavn API.';
  }

  if (typeof data !== 'object') {
    return null;
  }

  const obj = data as Record<string, unknown>;

  if (typeof obj.error === 'string') {
    return obj.error;
  }

  if (typeof obj.error === 'object' && obj.error !== null) {
    const err = obj.error as Record<string, unknown>;

    if (typeof err.msg === 'string') {
      return err.msg;
    }

    if (typeof err.code === 'string') {
      switch (err.code) {
        case 'INPUT_MISSING':
          return 'One or more required parameters are missing.';
        default:
          return `Saavn API error (${err.code}).`;
      }
    }

    return 'Saavn API returned an error.';
  }

  if (
    Object.prototype.hasOwnProperty.call(obj, 'stationid') &&
    obj.stationid === ''
  ) {
    return 'Invalid or expired station ID.';
  }

  if (typeof obj.status === 'string' && obj.status !== 'success') {
    return `Saavn API returned status: ${obj.status}.`;
  }

  return null;
}
