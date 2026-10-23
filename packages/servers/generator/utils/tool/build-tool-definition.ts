import type { JsonSchema } from "@usemcpkit/core";
import { JSON_CONTENT_TYPE } from "../const";
import { buildBodyArguments } from "../schema/build-body-arguments";
import { buildParameterSchema } from "../schema/build-parameter-schema";
import type { OpenApiParameter } from "../types/open-api-operation";
import type { Operation } from "../types/operation";
import type { ToolDefinition } from "../types/tool-definition";
import type { ToolDefinitionOptions } from "../types/tool-definition-options";
import { collectFixedHeaders } from "./collect-fixed-headers";
import { describeOperation } from "./describe-operation";
import { replacePlaceholder } from "./replace-placeholder";
import { simplifyMapping } from "./simplify-mapping";

export const buildToolDefinition = (operation: Operation, name: string, options: ToolDefinitionOptions) => {
  const { schema: schemaOptions, naming, descriptionPrefix } = options;
  const parameters: OpenApiParameter[] = operation.spec.parameters ?? [];
  const pathParameters = parameters.filter((parameter) => parameter.in === "path");
  const queryParameters = parameters.filter(
    (parameter) =>
      parameter.in === "query" &&
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
    if (parameter.in === "path") {
      path = replacePlaceholder(path, parameter.name, argName);
    } else {
      queryMapping[parameter.name] = argName;
    }
    if (parameter.in === "path" || parameter.required) {
      required.push(argName);
    }
  }
  const body =
    operation.spec.requestBody && operation.method !== "get"
      ? buildBodyArguments(operation.spec.requestBody, taken, schemaOptions, naming)
      : undefined;
  Object.assign(properties, body?.properties);
  required.push(...(body?.required ?? []));

  const fixedHeaders = collectFixedHeaders(parameters);
  const request: ToolDefinition["request"] = {
    method: operation.method.toUpperCase() as ToolDefinition["request"]["method"],
    path,
    ...(queryParameters.length > 0 && { query: simplifyMapping(queryMapping) }),
    ...(body?.wholeBody === undefined ? body && { body: simplifyMapping(body.mapping) } : { bodyArg: body.wholeBody }),
    ...(body && body.contentType !== JSON_CONTENT_TYPE && { contentType: body.contentType }),
    ...(Object.keys(fixedHeaders).length > 0 && { fixedHeaders }),
  };
  const definition: ToolDefinition = {
    name,
    description: describeOperation(operation, schemaOptions.stripBold, descriptionPrefix),
    input: { type: "object", properties, ...(required.length > 0 && { required }) },
    request,
  };
  return definition;
};
