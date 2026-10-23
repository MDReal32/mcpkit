import type { OpenApiOperation } from '../types/open-api-operation';

export const findRequiredHeader = (spec: OpenApiOperation) =>
  spec.parameters?.find((parameter) => parameter.in === 'header' && parameter.required);
