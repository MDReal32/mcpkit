import { collectOperations } from "../../utils/spec/collect-operations";
import { readSpec } from "../../utils/spec/read-spec";
import { buildToolDefinition } from "../../utils/tool/build-tool-definition";
import type { SpecPlan } from "../../utils/types/spec-plan";
import { argumentNaming } from "./argument-naming";
import { SCHEMA_OPTIONS, SPEC_URL } from "./const";
import { findExcludedTagReason } from "./find-excluded-tag-reason";
import { findUnsupportedReason } from "./find-unsupported-reason";
import { nameOperations } from "./name-operations";
import { parseSpec } from "./parse-spec";
import { toOperation } from "./to-operation";
import type { GitlabOperation } from "./types/gitlab-operation";

export const createSpecPlan = () => {
  const plan: SpecPlan<GitlabOperation> = {
    readDocument: (localPath) => readSpec(SPEC_URL, localPath, parseSpec),
    collectOperations: (document) => collectOperations(document, { toOperation }),
    describeOperation: ({ spec }) => spec.operationId ?? "",
    isExcluded: ({ category }) => findExcludedTagReason(category) !== undefined,
    findUnsupportedReason,
    nameOperations,
    buildToolDefinition: (operation, name) =>
      buildToolDefinition(operation, name, { schema: SCHEMA_OPTIONS, naming: argumentNaming }),
  };
  return plan;
};
