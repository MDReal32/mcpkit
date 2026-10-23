import type { OperationCandidate } from "../../utils/types/operation-candidate";
import { UNTAGGED_CATEGORY } from "./const";
import type { JiraOperation } from "./types/jira-operation";
import type { SpecSource } from "./types/spec-source";

export const toOperation = ({ method, path, spec }: OperationCandidate, source: SpecSource) => {
  const operation: JiraOperation = {
    source: source.name,
    method,
    path,
    category: spec.tags?.[0] ?? UNTAGGED_CATEGORY,
    spec,
  };
  return operation;
};
