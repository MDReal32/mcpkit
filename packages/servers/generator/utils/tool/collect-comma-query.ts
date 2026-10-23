import type { OpenApiParameter } from "../types/open-api-operation";

export const collectCommaQuery = (queryParameters: readonly OpenApiParameter[]) =>
  queryParameters
    .filter((parameter) => parameter.schema?.type === "array" && parameter.explode === false)
    .map((parameter) => parameter.name);
