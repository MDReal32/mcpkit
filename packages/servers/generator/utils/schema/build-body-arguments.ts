import { FILE_ARGUMENT_DESCRIPTION, FILES_ARGUMENT_DESCRIPTION, MULTIPART_CONTENT_TYPE } from "../const";
import { isFileListBody } from "../support/is-file-list-body";
import { selectBodyContent } from "../support/select-body-content";
import type { ArgumentNaming } from "../types/argument-naming";
import type { BodyArguments } from "../types/body-arguments";
import type { OpenApiRequestBody } from "../types/open-api-operation";
import type { SchemaOptions } from "../types/schema-options";
import { WHOLE_BODY_ARGUMENT } from "./const";
import { convertSchema } from "./convert-schema";
import { isBinarySchema } from "./is-binary-schema";

export const buildBodyArguments = (
  requestBody: OpenApiRequestBody,
  takenNames: ReadonlySet<string>,
  schemaOptions: SchemaOptions,
  naming: ArgumentNaming,
  filePartName?: string,
) => {
  const selected = selectBodyContent(requestBody.content);
  if (!selected) {
    return undefined;
  }
  const { contentType, schema } = selected;
  if (filePartName && isFileListBody(selected)) {
    const argName = naming.bodyProperty(filePartName, takenNames, new Set());
    const fileList: BodyArguments = {
      mapping: { [filePartName]: argName },
      properties: { [argName]: { type: "array", items: { type: "string" }, description: FILES_ARGUMENT_DESCRIPTION } },
      required: requestBody.required ? [argName] : [],
      contentType,
      fileArgs: [argName],
    };
    return fileList;
  }
  const converted = convertSchema(schema, schemaOptions);
  const result: BodyArguments = { mapping: {}, properties: {}, required: [], contentType, fileArgs: [] };
  if (Object.keys(converted.properties ?? {}).length === 0) {
    const argName = naming.bodyProperty(WHOLE_BODY_ARGUMENT, takenNames, new Set());
    const isFile = isBinarySchema(schema);
    return {
      ...result,
      properties: { [argName]: isFile ? { ...converted, description: FILE_ARGUMENT_DESCRIPTION } : converted },
      required: requestBody.required ? [argName] : [],
      wholeBody: argName,
      fileArgs: isFile ? [argName] : [],
    };
  }
  const claimed = new Set<string>();
  for (const [key, property] of Object.entries(converted.properties ?? {})) {
    const argName = naming.bodyProperty(key, takenNames, claimed);
    claimed.add(argName);
    result.mapping[key] = argName;
    const isFile = contentType === MULTIPART_CONTENT_TYPE && isBinarySchema(schema.properties?.[key]);
    result.properties[argName] = isFile ? { ...property, description: FILE_ARGUMENT_DESCRIPTION } : property;
    if (isFile) {
      result.fileArgs.push(argName);
    }
    if (converted.required?.includes(key)) {
      result.required.push(argName);
    }
  }
  return result;
};
