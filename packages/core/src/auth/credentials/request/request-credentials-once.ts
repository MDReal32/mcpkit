import type { AuthContext } from "../../types/auth-context";
import type { CredentialRequest } from "../../types/credentials/credential-request";
import type { CredentialExchange } from "./pending-credential-requests";
import { pendingCredentialRequests } from "./pending-credential-requests";

/** One form per server at a time; the request is built only by the call that opens it. */
export const requestCredentialsOnce = (
  serverName: string,
  createRequest: () => Promise<CredentialRequest>,
  requestCredentials: NonNullable<AuthContext["requestCredentials"]>,
) => {
  const pending = pendingCredentialRequests.get(serverName);
  if (pending) {
    return pending;
  }
  const exchange = createRequest()
    .then(async (request): Promise<CredentialExchange> => ({ request, response: await requestCredentials(request) }))
    .finally(() => {
      pendingCredentialRequests.delete(serverName);
    });
  pendingCredentialRequests.set(serverName, exchange);
  return exchange;
};
