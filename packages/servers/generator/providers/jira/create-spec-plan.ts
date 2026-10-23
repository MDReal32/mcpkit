import { collectOperations } from '../../utils/spec/collect-operations.ts';
import { readSpec } from '../../utils/spec/read-spec.ts';
import { buildToolDefinition } from '../../utils/tool/build-tool-definition.ts';
import { verbatimArgumentNaming } from '../../utils/tool/verbatim-argument-naming.ts';
import type { SpecPlan } from '../../utils/types/spec-plan.ts';
import { SCHEMA_OPTIONS } from './const.ts';
import { dereferenceOperation } from './dereference-operation.ts';
import { findUnsupportedReason } from './find-unsupported-reason.ts';
import { nameOperations } from './name-operations.ts';
import { toEntryKey } from './to-entry-key.ts';
import { toOperation } from './to-operation.ts';
import type { JiraOperation } from './types/jira-operation.ts';
import type { SpecSource } from './types/spec-source.ts';

export const createSpecPlan = (source: SpecSource) => {
  const plan: SpecPlan<JiraOperation> = {
    readDocument: (localPath) => readSpec(source.url, localPath),
    collectOperations: (document) => {
      const index = document.components?.schemas ?? {};
      return collectOperations(document, {
        acceptsPath: (path) => path.startsWith(source.pathPrefix),
        toOperation: (candidate) => toOperation(candidate, source),
      }).map((operation) => dereferenceOperation(operation, index));
    },
    describeOperation: toEntryKey,
    findUnsupportedReason,
    nameOperations: (operations) => nameOperations(operations, source),
    buildToolDefinition: (operation, name) =>
      buildToolDefinition(operation, name, { schema: SCHEMA_OPTIONS, naming: verbatimArgumentNaming }),
  };
  return plan;
};
