import type { CredentialResponse } from "@usemcpkit/core";

export interface FormServer {
  url: string;
  response: Promise<CredentialResponse>;
  close: () => Promise<void>;
}
