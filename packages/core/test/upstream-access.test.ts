import { createPingManifest, useTempDir } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { Manifest } from "../src/main";
import { AuthError, UnauthorizedError, withUpstreamAccess } from "../src/main";

const readHome = useTempDir("mcpkit-upstream-access-");

const createUpstreamManifest = (overrides: Partial<Manifest>) => ({
  ...createPingManifest("1.0.0"),
  tools: [],
  ...overrides,
});

describe("withUpstreamAccess", () => {
  it("signs an HTTP upstream with the first auth option the upstream accepts", async () => {
    const manifest = createUpstreamManifest({
      upstream: { type: "http", url: "https://mcp.example.com/mcp" },
      auth: [
        { type: "bearer", env: "FIRST_TOKEN" },
        { type: "bearer", env: "SECOND_TOKEN" },
      ],
    });
    const seen: string[] = [];

    const result = await withUpstreamAccess(
      manifest,
      async ({ headers }) => {
        seen.push(headers.Authorization ?? "");
        if (headers.Authorization === "Bearer one") {
          throw new UnauthorizedError("rejected");
        }
        return "ok";
      },
      { env: { MCPKIT_HOME: readHome(), FIRST_TOKEN: "one", SECOND_TOKEN: "two" } },
    );

    expect(result).toBe("ok");
    expect(seen).toEqual(["Bearer one", "Bearer two"]);
  });

  it("hands a stdio upstream only the credentials it forwards", async () => {
    const manifest = createUpstreamManifest({
      upstream: { type: "stdio", command: "demo-mcp", forwardEnv: ["DEMO_TOKEN"] },
    });

    const env = await withUpstreamAccess(manifest, async (access) => access.env, {
      env: { MCPKIT_HOME: readHome(), DEMO_TOKEN: "t-1", OTHER: "no" },
    });

    expect(env).toEqual({ DEMO_TOKEN: "t-1" });
  });

  it("forwards an optional credential when it is set and leaves it out when it is not", async () => {
    const manifest = createUpstreamManifest({
      upstream: { type: "stdio", command: "demo-mcp", optionalEnv: ["DEMO_SESSION", "DEMO_ID"] },
    });

    const withSession = await withUpstreamAccess(manifest, async (access) => access.env, {
      env: { MCPKIT_HOME: readHome(), DEMO_SESSION: "s-1" },
    });
    const without = await withUpstreamAccess(manifest, async (access) => access.env, {
      env: { MCPKIT_HOME: readHome() },
    });

    expect(withSession).toEqual({ DEMO_SESSION: "s-1" });
    expect(without).toEqual({});
  });

  it("names the missing credential of a stdio upstream", async () => {
    const manifest = createUpstreamManifest({
      upstream: { type: "stdio", command: "demo-mcp", forwardEnv: ["DEMO_TOKEN"] },
    });

    await expect(
      withUpstreamAccess(manifest, async () => "never", { env: { MCPKIT_HOME: readHome() } }),
    ).rejects.toBeInstanceOf(AuthError);
  });
});
