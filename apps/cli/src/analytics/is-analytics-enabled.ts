import type { Env } from "@usemcpkit/core";
import { DISABLED_VALUES, DO_NOT_TRACK_ENV, TELEMETRY_ENV } from "./const";

export const isAnalyticsEnabled = (env: Env) => {
  if (env[DO_NOT_TRACK_ENV] === "1") {
    return false;
  }
  return !DISABLED_VALUES.includes((env[TELEMETRY_ENV] ?? "").toLowerCase());
};
