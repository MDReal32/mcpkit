import type { AuthContext } from '../../types/auth-context';
import type { CredentialRequest } from '../../types/credentials/credential-request';
import { pendingCredentialRequests } from './pending-credential-requests';

export const requestCredentialsOnce = (
  request: CredentialRequest,
  requestCredentials: NonNullable<AuthContext['requestCredentials']>,
) => {
  const pending = pendingCredentialRequests.get(request.serverName);
  if (pending) {
    return pending;
  }
  const requesting = requestCredentials(request).finally(() => {
    pendingCredentialRequests.delete(request.serverName);
  });
  pendingCredentialRequests.set(request.serverName, requesting);
  return requesting;
};
