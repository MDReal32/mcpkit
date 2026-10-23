import type { JsonSchema } from '@usemcpkit/core';
import { buildBodyArguments } from './build-body-arguments.ts';
import { buildParameterSchema } from './build-parameter-schema.ts';
import { buildQueryArguments } from './build-query-arguments.ts';
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
  const properties: Record<string, JsonSchema> = {};
  const required: string[] = [];
  for (const parameter of pathParameters) {
    properties[parameter.name] = buildParameterSchema(parameter);
    required.push(parameter.name);
  }
  const queryArguments = buildQueryArguments(
    parameters.filter((parameter) => parameter.in === 'query'),
    new Set(Object.keys(properties)),
  );
  for (const { parameter, argName } of queryArguments) {
    properties[argName] = buildParameterSchema(parameter);
    if (parameter.required) {
      required.push(argName);
    }
  }
  const body =
    operation.spec.requestBody && operation.method !== 'get'
      ? buildBodyArguments(operation.spec.requestBody, new Set(Object.keys(properties)))
      : undefined;
  Object.assign(properties, body?.properties);
  required.push(...(body?.required ?? []));

  const queryMapping = Object.fromEntries(queryArguments.map(({ parameter, argName }) => [parameter.name, argName]));
  const request: ToolDefinition['request'] = {
    method: operation.method.toUpperCase() as ToolDefinition['request']['method'],
    path: operation.path,
    ...(queryArguments.length > 0 && { query: simplifyMapping(queryMapping) }),
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
