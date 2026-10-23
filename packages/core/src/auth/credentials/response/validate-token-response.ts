import { isStringRecord } from "../../../json";
import { fillTemplate } from "../../../manifest";
import type { CredentialRequest } from "../../types/credentials/credential-request";

export const validateTokenResponse = (request: CredentialRequest, response: Readonly<Record<string, unknown>>) => {
  const option = request.options.find((candidate) => candidate.index === response.option);
  if (!option) {
    return ["choose one of the offered credentials"];
  }
  const values = isStringRecord(response.values) ? response.values : {};
  return option.fields
    .filter((field) => !values[field.key]?.trim())
    .map((field) => fillTemplate(request.texts.requiredField, { label: field.label }));
};
