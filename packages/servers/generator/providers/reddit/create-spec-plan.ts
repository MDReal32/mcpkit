import { readFile } from "node:fs/promises";
import { collectOperations } from "../../utils/spec/collect-operations";
import { parseDereferencedJsonSpec } from "../../utils/spec/parse-dereferenced-json-spec";
import { findBodyReason } from "../../utils/support/find-body-reason";
import type { Operation } from "../../utils/types/operation";
import type { SpecPlan } from "../../utils/types/spec-plan";
import { buildRedditToolDefinition } from "./build-reddit-tool-definition";
import { SCHEMA_OPTIONS, SPEC_PATH } from "./const";
import { nameOperations } from "./name-operations";

export const createSpecPlan = () => {
  const plan: SpecPlan<Operation> = {
    readDocument: async (localPath) => parseDereferencedJsonSpec(await readFile(localPath ?? SPEC_PATH, "utf8")),
    collectOperations: (document) =>
      collectOperations(document, { toOperation: ({ method, path, spec }) => ({ method, path, spec }) }),
    describeOperation: ({ spec }) => spec.operationId ?? "",
    findUnsupportedReason: (operation) => findBodyReason(operation, { schema: SCHEMA_OPTIONS }),
    nameOperations,
    buildToolDefinition: buildRedditToolDefinition,
  };
  return plan;
};
