import { findBodyReason } from '../../utils/support/find-body-reason';
import { findRequiredHeader } from '../../utils/support/find-required-header';
import { SCHEMA_OPTIONS } from './const';
import type { JiraOperation } from './types/jira-operation';

export const findUnsupportedReason = (operation: JiraOperation) => {
  const requiredHeader = findRequiredHeader(operation.spec);
  if (requiredHeader) {
    return `requires the ${requiredHeader.name} header, header parameters are not supported`;
  }
  return findBodyReason(operation, { schema: SCHEMA_OPTIONS });
};
