import { collectOperations } from '../../utils/spec/collect-operations.ts';
import { readSpec } from '../../utils/spec/read-spec.ts';
import { buildToolDefinition } from '../../utils/tool/build-tool-definition.ts';
import type { SpecPlan } from '../../utils/types/spec-plan.ts';
import { argumentNaming } from './argument-naming.ts';
import { SCHEMA_OPTIONS, SPEC_URL } from './const.ts';
import { findUnsupportedReason } from './find-unsupported-reason.ts';
import { nameOperations } from './name-operations.ts';
import { parseSpec } from './parse-spec.ts';
import { toOperation } from './to-operation.ts';
import type { GitlabOperation } from './types/gitlab-operation.ts';

export const createSpecPlan = () => {
  const plan: SpecPlan<GitlabOperation> = {
    readDocument: (localPath) => readSpec(SPEC_URL, localPath, parseSpec),
    collectOperations: (document) => collectOperations(document, { toOperation }),
    describeOperation: ({ spec }) => spec.operationId ?? '',
    findUnsupportedReason,
    nameOperations,
    buildToolDefinition: (operation, name) =>
      buildToolDefinition(operation, name, { schema: SCHEMA_OPTIONS, naming: argumentNaming }),
  };
  return plan;
};
