import type { CredentialResponse } from '@mcpkit/core';

export interface FormServer {
  url: string;
  response: Promise<CredentialResponse>;
  close: () => Promise<void>;
}
