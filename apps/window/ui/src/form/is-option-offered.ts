import type { Applies } from "@usemcpkit/core";
import { compareVersions } from "./compare-versions";

/**
 * Whether an auth option fits the host's source and version. What is not known yet does not hide anything: before a
 * host is typed every option is offered, and before Check found the version only the sources narrow them.
 */
export const isOptionOffered = (applies: Applies | undefined, source?: string, version?: string) => {
  if (!applies) {
    return true;
  }
  if (source !== undefined && applies.sources !== undefined && !applies.sources.includes(source)) {
    return false;
  }
  if (version === undefined) {
    return true;
  }
  const fromOk = applies.from === undefined || compareVersions(version, applies.from) >= 0;
  const belowOk = applies.below === undefined || compareVersions(version, applies.below) < 0;
  return fromOk && belowOk;
};
