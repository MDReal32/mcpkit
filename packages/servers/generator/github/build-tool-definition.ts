import type { JsonSchema } from '@usemcpkit/core';
import { buildBodyArguments } from './build-body-arguments.ts';
import { buildParameterSchema } from './build-parameter-schema.ts';
import { cleanDescription } from './clean-description.ts';
import type { OpenApiParameter } from './types/open-api-operation.ts';
import type { Operation } from './types/operation.ts';
import type { ToolDefinition } from './types/tool-definition.ts';

const simplifyMapping = (mapping: Record<string, string>) =>
  Object.entries(mapping).every(([key, argName]) => key === argName) ? Object.keys(mapping) : mapping;

const describe = ({ spec }: Operation) => {
  const summary = (spec.summary ?? '').replace(/\.$/, '');
  const detail = cleanDescription(spec.description);
  const text = detail && detail !== summary ? `${summary}. ${detail}` : summary;
  return spec.deprecated ? `[Deprecated] ${text}` : text;
};

export const buildToolDefinition = (operation: Operation, name: string) => {
  const parameters: OpenApiParameter[] = operation.spec.parameters ?? [];
  const pathParameters = parameters.filter((parameter) => parameter.in === 'path');
  const queryParameters = parameters.filter(
    (parameter) => parameter.in === 'query' && !pathParameters.some((path) => path.name === parameter.name),
  );
  const properties: Record<string, JsonSchema> = {};
  const required: string[] = [];
  for (const parameter of [...pathParameters, ...queryParameters]) {
    properties[parameter.name] = buildParameterSchema(parameter);
    if (parameter.required) {
      required.push(parameter.name);
    }
  }
  const body =
    operation.spec.requestBody && operation.method !== 'get'
      ? buildBodyArguments(operation.spec.requestBody, new Set(Object.keys(properties)))
      : undefined;
  Object.assign(properties, body?.properties);
  required.push(...(body?.required ?? []));

  const request: ToolDefinition['request'] = {
    method: operation.method.toUpperCase() as ToolDefinition['request']['method'],
    path: operation.path,
    ...(queryParameters.length > 0 && { query: queryParameters.map((parameter) => parameter.name) }),
    ...(body && { body: simplifyMapping(body.mapping) }),
  };
  const definition: ToolDefinition = {
    name,
    description: describe(operation),
    input: { type: 'object', properties, ...(required.length > 0 && { required }) },
    request,
  };
  return definition;
};
