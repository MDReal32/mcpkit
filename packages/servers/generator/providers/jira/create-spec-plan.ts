import { collectOperations } from "../../utils/spec/collect-operations";
import { readSpec } from "../../utils/spec/read-spec";
import { buildToolDefinition } from "../../utils/tool/build-tool-definition";
import { verbatimArgumentNaming } from "../../utils/tool/verbatim-argument-naming";
import type { SpecPlan } from "../../utils/types/spec-plan";
import { DOWNLOAD_PATHS, SCHEMA_OPTIONS } from "./const";
import { dereferenceOperation } from "./dereference-operation";
import { findUnsupportedReason } from "./find-unsupported-reason";
import { nameOperations } from "./name-operations";
import { toEntryKey } from "./to-entry-key";
import { toOperation } from "./to-operation";
import type { JiraOperation } from "./types/jira-operation";
import type { SpecSource } from "./types/spec-source";

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
      buildToolDefinition(operation, name, {
        schema: SCHEMA_OPTIONS,
        naming: verbatimArgumentNaming,
        downloadPaths: DOWNLOAD_PATHS,
      }),
  };
  return plan;
};
