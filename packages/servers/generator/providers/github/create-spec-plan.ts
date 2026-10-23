import { DEFAULT_SCHEMA_OPTIONS } from '../../utils/schema/const';
import { collectOperations } from '../../utils/spec/collect-operations';
import { readSpec } from '../../utils/spec/read-spec';
import { findBodyReason } from '../../utils/support/find-body-reason';
import { buildToolDefinition } from '../../utils/tool/build-tool-definition';
import { verbatimArgumentNaming } from '../../utils/tool/verbatim-argument-naming';
import type { CategorizedOperation } from '../../utils/types/categorized-operation';
import type { SpecPlan } from '../../utils/types/spec-plan';
import { SPEC_URL } from './const';
import { nameOperations } from './name-operations';
import { toOperation } from './to-operation';

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
