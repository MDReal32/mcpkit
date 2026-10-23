import { collectOperations } from "../../utils/spec/collect-operations";
import { readSpec } from "../../utils/spec/read-spec";
import { buildToolDefinition } from "../../utils/tool/build-tool-definition";
import type { Operation } from "../../utils/types/operation";
import type { SpecPlan } from "../../utils/types/spec-plan";
import { argumentNaming } from "./argument-naming";
import { SCHEMA_OPTIONS } from "./const";
import { findUnsupportedReason } from "./find-unsupported-reason";
import { nameOperations } from "./name-operations";
import { parseSpec } from "./parse-spec";
import { toOperation } from "./to-operation";
import type { SpecSource } from "./types/spec-source";

export const createSpecPlan = (source: SpecSource) => {
  const plan: SpecPlan<Operation> = {
    readDocument: (localPath) => readSpec(source.url, localPath, parseSpec),
    collectOperations: (document) =>
      collectOperations(document, { toOperation: (candidate) => toOperation(candidate, source) }),
    describeOperation: ({ spec }) => `${source.group} ${spec.operationId}`,
    findUnsupportedReason: (operation) => findUnsupportedReason(operation, source),
    nameOperations: (operations) => nameOperations(operations, source),
    buildToolDefinition: (operation, name) =>
      buildToolDefinition(operation, name, {
        schema: SCHEMA_OPTIONS,
        naming: argumentNaming,
        descriptionPrefix: source.descriptionPrefix,
      }),
  };
  return plan;
};
