import type { HostCheckResult } from "@usemcpkit/core";
import { isJsonObject } from "@usemcpkit/core";

/** The answer of the check endpoint; `undefined` when it has another shape. */
export const readHostCheckResult = (body: unknown) => {
  if (!isJsonObject(body) || typeof body.source !== "string" || typeof body.label !== "string") {
    return undefined;
  }
  const result: HostCheckResult = {
    source: body.source,
    label: body.label,
    ...(typeof body.version === "string" ? { version: body.version } : {}),
  };
  return result;
};
