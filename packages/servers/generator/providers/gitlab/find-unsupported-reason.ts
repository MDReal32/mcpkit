import { findBodyReason } from "../../utils/support/find-body-reason";
import { SCHEMA_OPTIONS } from "./const";
import { findUndeclaredPlaceholder } from "./find-undeclared-placeholder";
import type { GitlabOperation } from "./types/gitlab-operation";

export const findUnsupportedReason = (operation: GitlabOperation) => {
  const undeclared = findUndeclaredPlaceholder(operation);
  if (undeclared) {
    return `path placeholder {${undeclared}} is not declared as a path parameter in the spec`;
  }
  if (operation.category === "") {
    return "operation has no tag";
  }
  return findBodyReason(operation, { schema: SCHEMA_OPTIONS });
};
