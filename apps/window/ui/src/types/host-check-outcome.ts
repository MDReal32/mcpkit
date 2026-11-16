import type { HostCheckFailed } from "./host-check-failed";
import type { HostChecked } from "./host-checked";

export type HostCheckOutcome = HostChecked | HostCheckFailed;
