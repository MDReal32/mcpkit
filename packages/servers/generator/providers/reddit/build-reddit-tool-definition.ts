import { buildToolDefinition } from "../../utils/tool/build-tool-definition";
import { verbatimArgumentNaming } from "../../utils/tool/verbatim-argument-naming";
import type { Operation } from "../../utils/types/operation";
import type { ToolDefinition } from "../../utils/types/tool-definition";
import { FIXED_QUERY, SCHEMA_OPTIONS } from "./const";
import { toResponseSpec } from "./to-response-spec";

export const buildRedditToolDefinition = (operation: Operation, name: string) => {
  const base = buildToolDefinition(operation, name, { schema: SCHEMA_OPTIONS, naming: verbatimArgumentNaming });
  const response = toResponseSpec(operation);
  const definition: ToolDefinition = {
    ...base,
    request: { ...base.request, fixedQuery: FIXED_QUERY },
    ...(response && { response }),
  };
  return definition;
};
