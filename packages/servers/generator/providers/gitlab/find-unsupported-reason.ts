import { findBodyReason } from '../../utils/support/find-body-reason.ts';
import { SCHEMA_OPTIONS } from './const.ts';
import { findExcludedTagReason } from './find-excluded-tag-reason.ts';
import { findUndeclaredPlaceholder } from './find-undeclared-placeholder.ts';
import type { GitlabOperation } from './types/gitlab-operation.ts';

export const findUnsupportedReason = (operation: GitlabOperation) => {
  const undeclared = findUndeclaredPlaceholder(operation);
  if (undeclared) {
    return `path placeholder {${undeclared}} is not declared as a path parameter in the spec`;
  }
  if (operation.category === '') {
    return 'operation has no tag';
  }
  const excludedReason = findExcludedTagReason(operation.category);
  if (excludedReason) {
    return excludedReason;
  }
  return findBodyReason(operation, { schema: SCHEMA_OPTIONS });
};
