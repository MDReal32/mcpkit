import type { CredentialRequest } from "../../types/credentials/credential-request";
import type { CredentialResponse } from "../../types/credentials/credential-response";
import { validateCredentialResponse } from "./validate-credential-response";

export const isValidCredentialResponse = (
  request: CredentialRequest,
  response: unknown,
): response is CredentialResponse => validateCredentialResponse(request, response).length === 0;
