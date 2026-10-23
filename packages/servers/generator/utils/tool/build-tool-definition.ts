import type { JsonSchema } from '@usemcpkit/core';
import { buildBodyArguments } from '../schema/build-body-arguments.ts';
import { buildParameterSchema } from '../schema/build-parameter-schema.ts';
import type { OpenApiParameter } from '../types/open-api-operation.ts';
import type { Operation } from '../types/operation.ts';
import type { ToolDefinition } from '../types/tool-definition.ts';
import type { ToolDefinitionOptions } from '../types/tool-definition-options.ts';
import { describeOperation } from './describe-operation.ts';
import { replacePlaceholder } from './replace-placeholder.ts';
import { simplifyMapping } from './simplify-mapping.ts';

export const buildToolDefinition = (operation: Operation, name: string, options: ToolDefinitionOptions) => {
  const { schema: schemaOptions, naming, descriptionPrefix } = options;
  const parameters: OpenApiParameter[] = operation.spec.parameters ?? [];
  const pathParameters = parameters.filter((parameter) => parameter.in === 'path');
  const queryParameters = parameters.filter(
    (parameter) =>
      parameter.in === 'query' &&
      !(naming.dropsQueryShadowedByPath && pathParameters.some((path) => path.name === parameter.name)),
  );
  const properties: Record<string, JsonSchema> = {};
  const required: string[] = [];
  const taken = new Set<string>();
  const queryMapping: Record<string, string> = {};
  let path = operation.path;
  for (const parameter of [...pathParameters, ...queryParameters]) {
    const argName = naming.parameter(parameter, taken);
    taken.add(argName);
    properties[argName] = buildParameterSchema(parameter, schemaOptions);
    if (parameter.in === 'path') {
      path = replacePlaceholder(path, parameter.name, argName);
    } else {
      queryMapping[parameter.name] = argName;
    }
    if (parameter.in === 'path' || parameter.required) {
      required.push(argName);
    }
  }
  const body =
    operation.spec.requestBody && operation.method !== 'get'
      ? buildBodyArguments(operation.spec.requestBody, taken, schemaOptions, naming)
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
    description: describeOperation(operation, schemaOptions.stripBold, descriptionPrefix),
    input: { type: 'object', properties, ...(required.length > 0 && { required }) },
    request,
  };
  return definition;
};
