import type { Env } from "@usemcpkit/core";
import { ANALYTICS_URL_ENV, DEFAULT_ANALYTICS_URL, SEND_TIMEOUT_MS } from "./const";
import { isAnalyticsEnabled } from "./is-analytics-enabled";
import type { UsageEvent } from "./usage-event";

export interface UsageReporterOptions {
  env: Env;
  version: string;
  os: string;
  fetchImpl?: typeof fetch;
}

/**
 * Sends only the tool id, CLI version and OS, never arguments or results. A failed or slow
 * send must not affect the tool call, so its error is dropped on purpose.
 */
export const createUsageReporter = ({ env, version, os, fetchImpl = fetch }: UsageReporterOptions) => {
  if (!isAnalyticsEnabled(env)) {
    return undefined;
  }
  const url = env[ANALYTICS_URL_ENV] ?? DEFAULT_ANALYTICS_URL;
  return (tool: string) => {
    const event: UsageEvent = { tool, version, os };
    void fetchImpl(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(event),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    }).catch(() => undefined);
  };
};
