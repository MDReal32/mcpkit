import { buildToolDefinition } from "../../utils/tool/build-tool-definition";
import { verbatimArgumentNaming } from "../../utils/tool/verbatim-argument-naming";
import type { Operation } from "../../utils/types/operation";
import type { ToolDefinition } from "../../utils/types/tool-definition";
import { FILE_PART_NAME, SCHEMA_OPTIONS } from "./const";
import { toResponseSpec } from "./to-response-spec";

export const buildMediumToolDefinition = (operation: Operation, name: string) => {
  const base = buildToolDefinition(operation, name, {
    schema: SCHEMA_OPTIONS,
    naming: verbatimArgumentNaming,
    filePartName: FILE_PART_NAME,
  });
  const response = toResponseSpec(operation);
  const definition: ToolDefinition = { ...base, ...(response && { response }) };
  return definition;
};
