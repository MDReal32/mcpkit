import { fillTemplate } from "@usemcpkit/core";
import type { SubmitResult } from "../types/submit-result";
import { createSessionHeaders } from "./create-session-headers";
import { readErrorList } from "./read-error-list";

export const postFormJson = async (path: string, body: unknown, requestFailed: string) => {
  const response = await fetch(path, {
    method: "POST",
    headers: createSessionHeaders(),
    body: JSON.stringify(body),
  });
  const errors = response.ok ? [] : readErrorList(await response.json().catch(() => null));
  const result: SubmitResult = {
    ok: response.ok,
    errors:
      response.ok || errors.length > 0 ? errors : [fillTemplate(requestFailed, { status: String(response.status) })],
  };
  return result;
};
