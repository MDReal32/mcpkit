import type { CredentialRequest, TokenImportRequest } from '@mcpkit/core';
import type { FormDraft } from '../types/form-draft';
import { pickDomain } from './pick-domain';

export const buildTokenImportRequest = (request: CredentialRequest, draft: FormDraft, action: number) => {
  const importRequest: TokenImportRequest = { option: draft.option, action, ...pickDomain(request, draft) };
  return importRequest;
};
