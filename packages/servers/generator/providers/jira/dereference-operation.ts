import type { OpenApiOperation, OpenApiRequestBody } from '../../utils/types/open-api-operation.ts';
import { dereferenceSchema, type SchemaIndex } from './dereference-schema.ts';
import type { JiraOperation } from './types/jira-operation.ts';

const dereferenceBody = (body: OpenApiRequestBody, index: SchemaIndex) => {
  const content = Object.fromEntries(
    Object.entries(body.content).map(([type, media]) => [
      type,
      { ...media, ...(media.schema && { schema: dereferenceSchema(media.schema, index) }) },
    ]),
  );
  const result: OpenApiRequestBody = { ...body, content };
  return result;
};

export const dereferenceOperation = (operation: JiraOperation, index: SchemaIndex) => {
  const { spec } = operation;
  const resolved: OpenApiOperation = {
    ...spec,
    ...(spec.parameters && {
      parameters: spec.parameters.map((parameter) => ({
        ...parameter,
        ...(parameter.schema && { schema: dereferenceSchema(parameter.schema, index) }),
      })),
    }),
    ...(spec.requestBody && { requestBody: dereferenceBody(spec.requestBody, index) }),
  };
  const result: JiraOperation = { ...operation, spec: resolved };
  return result;
};
