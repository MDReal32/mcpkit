import { findBodyReason } from '../../utils/support/find-body-reason.ts';
import { findRequiredHeader } from '../../utils/support/find-required-header.ts';
import type { Operation } from '../../utils/types/operation.ts';
import { BODY_REASON_OPTIONS } from './const.ts';
import type { SpecSource } from './types/spec-source.ts';

export const findUnsupportedReason = (operation: Operation, source: SpecSource) => {
  if (!operation.path.startsWith(`${source.apiRoot}/`)) {
    return `path ${operation.path} is outside ${source.apiRoot}`;
  }
  const header = findRequiredHeader(operation.spec);
  if (header) {
    return `required header ${header.name} cannot be sent, header parameters are unsupported`;
  }
  return findBodyReason(operation, BODY_REASON_OPTIONS);
};
