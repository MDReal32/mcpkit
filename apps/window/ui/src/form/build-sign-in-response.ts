import type { CredentialRequest, SignInCredentialResponse } from "@usemcpkit/core";
import type { FormDraft } from "../types/form-draft";
import { pickDomain } from "./pick-domain";

export const buildSignInResponse = (request: CredentialRequest, draft: FormDraft) => {
  const response: SignInCredentialResponse = { method: "sign-in", ...pickDomain(request, draft) };
  return response;
};
