import { collectOperations } from "../../utils/spec/collect-operations";
import { readSpec } from "../../utils/spec/read-spec";
import { buildToolDefinition } from "../../utils/tool/build-tool-definition";
import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import type { SpecPlan } from "../../utils/types/spec-plan";
import { argumentNaming } from "./argument-naming";
import { EXCLUDED_OPERATIONS, SCHEMA_OPTIONS } from "./const";
import { findUnsupportedReason } from "./find-unsupported-reason";
import { nameOperations } from "./name-operations";
import { parseSpec } from "./parse-spec";
import { toOperation } from "./to-operation";

export const createSpecPlan = (url: string) => {
  const plan: SpecPlan<CategorizedOperation> = {
    readDocument: (localPath) => readSpec(url, localPath, parseSpec),
    collectOperations: (document) => collectOperations(document, { toOperation }),
    describeOperation: ({ spec }) => spec.operationId ?? "",
    isExcluded: ({ spec }) => EXCLUDED_OPERATIONS[spec.operationId ?? ""] !== undefined,
    findUnsupportedReason,
    nameOperations,
    buildToolDefinition: (operation, name) =>
      buildToolDefinition(operation, name, { schema: SCHEMA_OPTIONS, naming: argumentNaming }),
  };
  return plan;
};
