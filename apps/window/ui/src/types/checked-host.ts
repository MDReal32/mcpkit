import type { HostCheckResult } from "@usemcpkit/core";

/** What Check found, kept with the host it was for so a host typed afterwards shows nothing. */
export interface CheckedHost {
  host: string;
  result: HostCheckResult;
}
