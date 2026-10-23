import type { CredentialRequest } from "@usemcpkit/core";
import { isJsonObject, resolveCliCommand, validateCredentialResponse } from "@usemcpkit/core";
import { PENDING_TOKEN_VALUE } from "../const";
import type { TokenImportPlan } from "../types/token-import-plan";

/** Checks the import request against what the form offered before anything runs; the domain becomes a CLI argument. */
export const prepareTokenImport = (request: CredentialRequest, body: unknown) => {
  if (!isJsonObject(body)) {
    throw new Error("the import request must be a JSON object");
  }
  const option = request.options.find((candidate) => candidate.index === body.option);
  const action = typeof body.action === "number" ? option?.actions[body.action] : undefined;
  const field = option?.fields[0];
  if (!option || action?.type !== "cli" || !field || option.fields.length !== 1) {
    throw new Error("this credential cannot be fetched automatically");
  }
  const domain = request.domain && typeof body.domain === "string" ? body.domain.trim() : undefined;
  const candidate = {
    method: "token",
    option: option.index,
    values: { [field.key]: PENDING_TOKEN_VALUE },
    ...(request.domain ? { domain } : {}),
  };
  const errors = validateCredentialResponse(request, candidate);
  if (errors.length > 0) {
    throw new Error(errors.join("; "));
  }
  const cli = resolveCliCommand(action, domain ?? request.domainInUse);
  const plan: TokenImportPlan = {
    cli,
    option: option.index,
    key: field.key,
    domain,
  };
  return plan;
};
