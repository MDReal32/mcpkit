import type { CredentialRequest } from "@usemcpkit/core";
import type { FormDraft } from "../types/form-draft";
import { buildMethods } from "./build-methods";
import { pickMethodOption } from "./pick-method-option";

export const createFormDraft = (request: CredentialRequest) => {
  const keys = request.options.flatMap((option) => option.fields.map((field) => field.key));
  const first = buildMethods(request)[0];
  const draft: FormDraft = {
    option: (first && pickMethodOption(first)) ?? request.options[0]?.index ?? -1,
    method: first?.key ?? "",
    values: Object.fromEntries(keys.map((key) => [key, ""])),
    domain: request.domain?.value ?? "",
  };
  return draft;
};
