import { selectBodyContent } from "../support/select-body-content";
import type { ArgumentNaming } from "../types/argument-naming";
import type { BodyArguments } from "../types/body-arguments";
import type { OpenApiRequestBody } from "../types/open-api-operation";
import type { SchemaOptions } from "../types/schema-options";
import { WHOLE_BODY_ARGUMENT } from "./const";
import { convertSchema } from "./convert-schema";

export const buildBodyArguments = (
  requestBody: OpenApiRequestBody,
  takenNames: ReadonlySet<string>,
  schemaOptions: SchemaOptions,
  naming: ArgumentNaming,
) => {
  const selected = selectBodyContent(requestBody.content);
  if (!selected) {
    return undefined;
  }
  const converted = convertSchema(selected.schema, schemaOptions);
  const result: BodyArguments = { mapping: {}, properties: {}, required: [], contentType: selected.contentType };
  if (Object.keys(converted.properties ?? {}).length === 0) {
    const argName = naming.bodyProperty(WHOLE_BODY_ARGUMENT, takenNames, new Set());
    return {
      ...result,
      properties: { [argName]: converted },
      required: requestBody.required ? [argName] : [],
      wholeBody: argName,
    };
  }
  const claimed = new Set<string>();
  for (const [key, property] of Object.entries(converted.properties ?? {})) {
    const argName = naming.bodyProperty(key, takenNames, claimed);
    claimed.add(argName);
    result.mapping[key] = argName;
    result.properties[argName] = property;
    if (converted.required?.includes(key)) {
      result.required.push(argName);
    }
  }
  return result;
};
