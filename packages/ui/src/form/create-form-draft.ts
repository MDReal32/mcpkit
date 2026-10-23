import type { CredentialRequest } from "@usemcpkit/core";
import type { FormDraft } from "../types/form-draft";

export const createFormDraft = (request: CredentialRequest) => {
  const keys = request.options.flatMap((option) => option.fields.map((field) => field.key));
  const draft: FormDraft = {
    option: request.options[0]?.index ?? -1,
    values: Object.fromEntries(keys.map((key) => [key, ""])),
    domain: request.domain?.value ?? "",
  };
  return draft;
};
