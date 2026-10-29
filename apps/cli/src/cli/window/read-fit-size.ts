import { isJsonObject } from "@usemcpkit/core";

/** The `[{ width, height }]` the page passes to the fit binding, as whole pixels; undefined when it is anything else. */
export const readFitSize = (request: string) => {
  const args: unknown = JSON.parse(request);
  const size = Array.isArray(args) ? args[0] : undefined;
  if (!isJsonObject(size) || typeof size.width !== "number" || typeof size.height !== "number") {
    return undefined;
  }
  return { width: Math.round(size.width), height: Math.round(size.height) };
};
