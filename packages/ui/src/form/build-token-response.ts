import type { CredentialRequest, TokenCredentialResponse } from '@mcpkit/core';
import type { FormDraft } from '../types/form-draft';
import { pickDomain } from './pick-domain';

export const buildTokenResponse = (request: CredentialRequest, draft: FormDraft) => {
  const option = request.options.find((candidate) => candidate.index === draft.option);
  const fields = option?.fields ?? [];
  const response: TokenCredentialResponse = {
    method: 'token',
    option: draft.option,
    values: Object.fromEntries(fields.map((field) => [field.key, draft.values[field.key] ?? ''])),
    ...pickDomain(request, draft),
  };
  return response;
};
