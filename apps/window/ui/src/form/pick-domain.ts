import type { CredentialRequest } from "@usemcpkit/core";
import type { FormDraft } from "../types/form-draft";

/** The domain belongs in the answer only when the form offered it. */
export const pickDomain = (request: CredentialRequest, draft: FormDraft) =>
  request.domain ? { domain: draft.domain.trim() } : {};
