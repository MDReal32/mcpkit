import type { HostCheckRequest } from "@usemcpkit/core";
import { CREDENTIALS_FORM_API, fillTemplate } from "@usemcpkit/core";
import type { HostCheckOutcome } from "../types/host-check-outcome";
import { createSessionHeaders } from "./create-session-headers";
import { readErrorList } from "./read-error-list";
import { readHostCheckResult } from "./read-host-check-result";
import { resolveApiUrl } from "./resolve-api-url";

/** Asks the form server which source the typed host is and what version its server runs. */
export const checkHost = async (request: HostCheckRequest, requestFailed: string) => {
  const response = await fetch(resolveApiUrl(CREDENTIALS_FORM_API.check), {
    method: "POST",
    headers: createSessionHeaders(),
    body: JSON.stringify(request),
  });
  const body: unknown = await response.json().catch(() => null);
  const result = response.ok ? readHostCheckResult(body) : undefined;
  if (result) {
    const outcome: HostCheckOutcome = { ok: true, result };
    return outcome;
  }
  const errors = readErrorList(body);
  const outcome: HostCheckOutcome = {
    ok: false,
    errors: errors.length > 0 ? errors : [fillTemplate(requestFailed, { status: String(response.status) })],
  };
  return outcome;
};
