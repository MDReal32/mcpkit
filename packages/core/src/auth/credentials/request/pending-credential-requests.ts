import type { CredentialRequest } from "../../types/credentials/credential-request";
import type { CredentialResponse } from "../../types/credentials/credential-response";

export interface CredentialExchange {
  request: CredentialRequest;
  response: CredentialResponse;
}

/** Per server: the open credentials form, shared by calls that arrive while it is open. */
export const pendingCredentialRequests = new Map<string, Promise<CredentialExchange>>();
