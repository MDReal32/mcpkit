import type { CredentialResponse } from '../../types/credentials/credential-response';

/** Per server: the open credentials form, shared by calls that arrive while it is open. */
export const pendingCredentialRequests = new Map<string, Promise<CredentialResponse>>();
