import type { HostCheckResult } from "@usemcpkit/core";

export interface HostChecked {
  ok: true;
  result: HostCheckResult;
}
