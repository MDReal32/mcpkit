import type { JsonSchema } from '@usemcpkit/core';
import { buildBodyArguments } from './build-body-arguments.ts';
import { buildParameterSchema } from './build-parameter-schema.ts';
import { cleanDescription } from './clean-description.ts';
import { toArgName } from './to-arg-name.ts';
import type { OpenApiParameter } from './types/open-api-operation.ts';
import type { Operation } from './types/operation.ts';
import type { SpecSource } from './types/spec-source.ts';
import type { ToolDefinition } from './types/tool-definition.ts';

const simplifyMapping = (mapping: Record<string, string>) =>
  Object.entries(mapping).every(([key, argName]) => key === argName) ? Object.keys(mapping) : mapping;

const describe = ({ spec }: Operation, source: SpecSource) => {
  const summary = (spec.summary ?? '').replace(/\.$/, '');
  const detail = cleanDescription(spec.description);
  const text = detail && detail !== summary ? `${summary}. ${detail}` : summary;
  const prefix = spec.deprecated ? `${source.descriptionPrefix} [Deprecated]` : source.descriptionPrefix;
  return `${prefix} ${text}`;
};

const claimArgName = (parameter: OpenApiParameter, properties: Record<string, JsonSchema>) => {
  const argName = toArgName(parameter.name);
  if (argName in properties) {
    throw new Error(`parameter "${parameter.name}" maps to the already used argument "${argName}"`);
  }
  return argName;
};

export const buildToolDefinition = (operation: Operation, name: string, source: SpecSource) => {
  const parameters: OpenApiParameter[] = operation.spec.parameters ?? [];
  const pathParameters = parameters.filter((parameter) => parameter.in === 'path');
  const queryParameters = parameters.filter(
    (parameter) => parameter.in === 'query' && !pathParameters.some((path) => path.name === parameter.name),
  );
  const properties: Record<string, JsonSchema> = {};
  const required: string[] = [];
  const queryMapping: Record<string, string> = {};
  let path = operation.path;
  for (const parameter of [...pathParameters, ...queryParameters]) {
    const argName = claimArgName(parameter, properties);
    properties[argName] = buildParameterSchema(parameter);
    if (parameter.in === 'path') {
      path = path.replaceAll(`{${parameter.name}}`, `{${argName}}`);
    } else {
      queryMapping[parameter.name] = argName;
    }
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

  const request: ToolDefinition['request'] = {
    method: operation.method.toUpperCase() as ToolDefinition['request']['method'],
    path,
    ...(queryParameters.length > 0 && { query: simplifyMapping(queryMapping) }),
    ...(body && { body: simplifyMapping(body.mapping) }),
  };
  const definition: ToolDefinition = {
    name,
    description: describe(operation, source),
    input: { type: 'object', properties, ...(required.length > 0 && { required }) },
    request,
  };
  return definition;
};
