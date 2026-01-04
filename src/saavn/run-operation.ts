import { z, ZodError, type ZodType } from 'zod';
import { fetchFromSaavn } from '@/helpers/fetch.js';
import {
  fromZodError,
  networkError,
  internalError,
  SDKError,
  detectSaavnApiError,
} from '@/helpers/errors.js';

type AnyZodSchema = ZodType<unknown, any, any>;

type OperationLike<P extends AnyZodSchema, R extends AnyZodSchema, O> = {
  call: string;
  schema: {
    params: P;
    response: R;
  };
  mapper: (data: z.infer<R>) => O;
};

export async function runOperation<
  P extends AnyZodSchema,
  R extends AnyZodSchema,
  O,
>(op: OperationLike<P, R, O>, input: z.input<P>): Promise<O> {
  let parsedParams: Record<string, unknown>;

  try {
    parsedParams = op.schema.params.parse(input) as Record<string, unknown>;
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e, 'params', op.call);
    }
    throw internalError('Failed to validate parameters.', e);
  }

  const params = Object.fromEntries(
    Object.entries(parsedParams).map(([k, v]) => [k, String(v)]),
  );

  const res = await fetchFromSaavn({ call: op.call, params });

  if (!res.ok) {
    throw networkError(op.call, res.status);
  }

  const apiErrorMessage = detectSaavnApiError(res.data);
  if (apiErrorMessage) {
    throw new SDKError('API_ERROR', apiErrorMessage, {
      details: {
        call: op.call,
        response: res.data,
      },
    });
  }

  try {
    const parsed = op.schema.response.parse(res.data);
    return op.mapper(parsed);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e, 'response', op.call);
    }
    throw internalError('Failed to parse or map response.', e);
  }
}
