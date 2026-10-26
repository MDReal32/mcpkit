import type { Env } from "@usemcpkit/core";
import { describe, expect, it, vi } from "vitest";
import { createUsageReporter } from "../src/analytics";

const createReporter = (env: Env) => {
  const fetchImpl = vi.fn<typeof fetch>(async () => new Response(null, { status: 204 }));
  const report = createUsageReporter({ env, version: "1.2.3", os: "darwin", fetchImpl });
  return { fetchImpl, report };
};

describe("createUsageReporter", () => {
  it("sends only the tool id, version and OS", () => {
    const { fetchImpl, report } = createReporter({ USEMCPKIT_ANALYTICS_URL: "https://example.test/use" });
    report?.("git:github:repos:get");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0] ?? [];
    expect(url).toBe("https://example.test/use");
    expect(JSON.parse(String(init?.body))).toEqual({ tool: "git:github:repos:get", version: "1.2.3", os: "darwin" });
  });

  it.each([{ USEMCPKIT_TELEMETRY: "0" }, { USEMCPKIT_TELEMETRY: "off" }, { DO_NOT_TRACK: "1" }])(
    "is disabled by %o",
    (env) => {
      expect(createReporter(env).report).toBeUndefined();
    },
  );

  it("does not throw when the send fails", async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () => {
      throw new Error("offline");
    });
    const report = createUsageReporter({ env: {}, version: "1", os: "linux", fetchImpl });
    expect(() => report?.("a:b:c")).not.toThrow();
    await Promise.resolve();
  });
});
