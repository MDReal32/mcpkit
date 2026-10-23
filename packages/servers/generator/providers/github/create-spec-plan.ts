import { DEFAULT_SCHEMA_OPTIONS } from '../../utils/schema/const.ts';
import { collectOperations } from '../../utils/spec/collect-operations.ts';
import { readSpec } from '../../utils/spec/read-spec.ts';
import { findBodyReason } from '../../utils/support/find-body-reason.ts';
import { buildToolDefinition } from '../../utils/tool/build-tool-definition.ts';
import { verbatimArgumentNaming } from '../../utils/tool/verbatim-argument-naming.ts';
import type { CategorizedOperation } from '../../utils/types/categorized-operation.ts';
import type { SpecPlan } from '../../utils/types/spec-plan.ts';
import { SPEC_URL } from './const.ts';
import { nameOperations } from './name-operations.ts';
import { toOperation } from './to-operation.ts';

export const createSpecPlan = () => {
  const plan: SpecPlan<CategorizedOperation> = {
    readDocument: (localPath) => readSpec(SPEC_URL, localPath),
    collectOperations: (document) => collectOperations(document, { toOperation }),
    describeOperation: ({ spec }) => spec.operationId ?? '',
    findUnsupportedReason: (operation) => findBodyReason(operation, { schema: DEFAULT_SCHEMA_OPTIONS }),
    nameOperations,
    buildToolDefinition: (operation, name) =>
      buildToolDefinition(operation, name, { schema: DEFAULT_SCHEMA_OPTIONS, naming: verbatimArgumentNaming }),
  };
  return plan;
};
