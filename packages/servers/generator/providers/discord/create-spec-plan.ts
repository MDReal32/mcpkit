import { collectOperations } from "../../utils/spec/collect-operations";
import { parseDereferencedJsonSpec } from "../../utils/spec/parse-dereferenced-json-spec";
import { readSpec } from "../../utils/spec/read-spec";
import { buildToolDefinition } from "../../utils/tool/build-tool-definition";
import { verbatimArgumentNaming } from "../../utils/tool/verbatim-argument-naming";
import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import type { SpecPlan } from "../../utils/types/spec-plan";
import { SCHEMA_OPTIONS, SPEC_URL } from "./const";
import { findUnsupportedReason } from "./find-unsupported-reason";
import { nameOperations } from "./name-operations";
import { toOperation } from "./to-operation";

export const createSpecPlan = () => {
  const plan: SpecPlan<CategorizedOperation> = {
    readDocument: (localPath) => readSpec(SPEC_URL, localPath, parseDereferencedJsonSpec),
    collectOperations: (document) => collectOperations(document, { toOperation }),
    describeOperation: ({ spec }) => spec.operationId ?? "",
    findUnsupportedReason,
    nameOperations,
    buildToolDefinition: (operation, name) =>
      buildToolDefinition(operation, name, { schema: SCHEMA_OPTIONS, naming: verbatimArgumentNaming }),
  };
  return plan;
};
