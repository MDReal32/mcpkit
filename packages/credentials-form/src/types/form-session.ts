import type { CredentialRequest, CredentialResponse } from '@mcpkit/core';

export interface FormSession {
  request: CredentialRequest;
  page: string;
  token: string;
  host: string;
  answer: (response: CredentialResponse) => void;
  cancel: () => void;
}
