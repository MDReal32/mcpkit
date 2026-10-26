export const DEFAULT_ANALYTICS_URL = "https://usage.usemcpkit.dev/v1/use";

export const ANALYTICS_URL_ENV = "USEMCPKIT_ANALYTICS_URL";

export const TELEMETRY_ENV = "USEMCPKIT_TELEMETRY";

export const DO_NOT_TRACK_ENV = "DO_NOT_TRACK";

export const DISABLED_VALUES: readonly string[] = ["0", "false", "off", "no"];

export const SEND_TIMEOUT_MS = 2000;
export const ANALYTICS_NOTICE =
  "mcpkit counts which tools are used (tool id, version and OS only, no arguments); turn it off with USEMCPKIT_TELEMETRY=0 or DO_NOT_TRACK=1";
