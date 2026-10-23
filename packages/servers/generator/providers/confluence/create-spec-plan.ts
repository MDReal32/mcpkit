import { collectOperations } from '../../utils/spec/collect-operations.ts';
import { readSpec } from '../../utils/spec/read-spec.ts';
import { buildToolDefinition } from '../../utils/tool/build-tool-definition.ts';
import type { Operation } from '../../utils/types/operation.ts';
import type { SpecPlan } from '../../utils/types/spec-plan.ts';
import { argumentNaming } from './argument-naming.ts';
import { SCHEMA_OPTIONS } from './const.ts';
import { findUnsupportedReason } from './find-unsupported-reason.ts';
import { nameOperations } from './name-operations.ts';
import { parseSpec } from './parse-spec.ts';
import { toOperation } from './to-operation.ts';
import type { SpecSource } from './types/spec-source.ts';

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
