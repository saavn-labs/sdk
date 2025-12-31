import { z } from 'zod';
import { describe, expect, it } from 'vitest';
import { SaavnOperation } from '../../src/types';
import { item } from '../postman/collections/JioSaavn_API_v4.postman_collection.json' assert { type: 'json' };

function expectSchema(schema: z.ZodType, data: unknown, name: string) {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error(`\n❌ Schema validation failed: ${name}`);
    console.error(result.error.issues.map((issue) => issue));
  }

  expect(result.success).toBe(true);
}

function extractUserParams(
  rawParams: Record<string, string>,
  schema: z.ZodType,
) {
  const shape = (schema as z.ZodObject<z.ZodRawShape>)._def.shape;
  const allowedKeys = Object.keys(shape);

  return Object.fromEntries(
    Object.entries(rawParams).filter(([key]) => allowedKeys.includes(key)),
  );
}

function getPostmanCase(group: string, requestName: string) {
  const reqItem = item
    .find((i) => i.name === group)
    ?.item?.find((i) => i.name === requestName);

  if (!reqItem) {
    throw new Error(`Missing Postman case: ${group} -> ${requestName}`);
  }

  const params = Object.fromEntries(
    (reqItem.request?.url?.query ?? []).map((q) => [q.key, q.value]),
  );

  const response = reqItem.response?.[0]?.body
    ? JSON.parse(reqItem.response[0].body)
    : undefined;

  if (!response) {
    throw new Error(`Missing response body: ${group} -> ${requestName}`);
  }

  return {
    params,
    response,
    op: reqItem.request?.url?.path?.join('.') ?? 'unknown',
  };
}

export function runSaavnTestCases(
  groupName: string,
  testCases: Array<{ request: string; op: SaavnOperation }>,
) {
  testCases.forEach(({ request, op }) => {
    const testName = `Saavn${groupName.trim()} > ${request}`;

    describe(testName, () => {
      it(`validates against (${op.call})`, () => {
        const { params, response } = getPostmanCase(groupName, request);
        const userParams = extractUserParams(params, op.params);

        expectSchema(op.params, userParams, `${request} > params`);
        expectSchema(
          op.response,
          response,
          `${request} > response`,
        );
      });
    });
  });
}
