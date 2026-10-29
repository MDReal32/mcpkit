import type { OpenApiParameter } from "../../utils/types/open-api-operation";
import { BRACKETED_QUERY_PARAMETERS, JSON_QUERY_PARAMETERS } from "./const";

export const toQueryParameter = (parameter: OpenApiParameter) => {
  if (parameter.in !== "query" || parameter.schema?.type !== "array") {
    return parameter;
  }
  if (JSON_QUERY_PARAMETERS.includes(parameter.name)) {
    const jsonFilter: OpenApiParameter = { ...parameter, schema: { type: "string" } };
    return jsonFilter;
  }
  if (BRACKETED_QUERY_PARAMETERS.includes(parameter.name)) {
    const bracketed: OpenApiParameter = { ...parameter, name: `${parameter.name}[]` };
    return bracketed;
  }
  return parameter;
};
