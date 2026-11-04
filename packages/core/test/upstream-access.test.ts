import { createPingManifest, useTempDir } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { CredentialRequest, CredentialResponse, Manifest } from "../src/main";
import { AuthError, createFileSecretStore, UnauthorizedError, withUpstreamAccess } from "../src/main";

const readHome = useTempDir("usemcpkit-upstream-access-");

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
      { env: { USEMCPKIT_HOME: readHome(), FIRST_TOKEN: "one", SECOND_TOKEN: "two" } },
    );

    expect(result).toBe("ok");
    expect(seen).toEqual(["Bearer one", "Bearer two"]);
  });

  it("hands a stdio upstream only the credentials it forwards", async () => {
    const manifest = createUpstreamManifest({
      upstream: { type: "stdio", command: "demo-mcp", forwardEnv: ["DEMO_TOKEN"] },
    });

    const env = await withUpstreamAccess(manifest, async (access) => access.env, {
      env: { USEMCPKIT_HOME: readHome(), DEMO_TOKEN: "t-1", OTHER: "no" },
    });

    expect(env).toEqual({ DEMO_TOKEN: "t-1" });
  });

  it("forwards an optional credential when it is set and leaves it out when it is not", async () => {
    const manifest = createUpstreamManifest({
      upstream: { type: "stdio", command: "demo-mcp", optionalEnv: ["DEMO_SESSION", "DEMO_ID"] },
    });

    const withSession = await withUpstreamAccess(manifest, async (access) => access.env, {
      env: { USEMCPKIT_HOME: readHome(), DEMO_SESSION: "s-1" },
    });
    const without = await withUpstreamAccess(manifest, async (access) => access.env, {
      env: { USEMCPKIT_HOME: readHome() },
    });

    expect(withSession).toEqual({ DEMO_SESSION: "s-1" });
    expect(without).toEqual({});
  });

  it("names the missing credential of a stdio upstream", async () => {
    const manifest = createUpstreamManifest({
      upstream: { type: "stdio", command: "demo-mcp", forwardEnv: ["DEMO_TOKEN"] },
    });

    await expect(
      withUpstreamAccess(manifest, async () => "never", { env: { USEMCPKIT_HOME: readHome() } }),
    ).rejects.toBeInstanceOf(AuthError);
  });
});

describe("a stdio upstream with credentials missing", () => {
  const createFormManifest = () =>
    createUpstreamManifest({
      upstream: {
        type: "stdio",
        command: "demo-mcp",
        forwardEnv: ["DEMO_ID", "DEMO_SECRET"],
        ui: {
          inputs: { DEMO_ID: { label: "App id", secret: false }, DEMO_SECRET: { hint: "From the portal" } },
          actions: [{ type: "link", label: "Open the portal", url: "https://portal.example.com" }],
        },
      },
    });

  const createForm = (values: Record<string, string>) => {
    const requests: CredentialRequest[] = [];
    const requestCredentials = async (request: CredentialRequest) => {
      requests.push(request);
      const response: CredentialResponse = { method: "token", option: 0, values };
      return response;
    };
    return { requests, requestCredentials };
  };

  it("asks the form for what is missing, passes it on and saves it once the upstream has started", async () => {
    const env = { USEMCPKIT_HOME: readHome(), DEMO_ID: "id-1" };
    const secretStore = createFileSecretStore(env);
    const { requests, requestCredentials } = createForm({ DEMO_SECRET: " s-1 " });
    const manifest = createFormManifest();

    const forwarded = await withUpstreamAccess(manifest, async (access) => access.env, {
      env,
      secretStore,
      requestCredentials,
    });

    expect(forwarded).toEqual({ DEMO_ID: "id-1", DEMO_SECRET: "s-1" });
    expect(requests).toHaveLength(1);
    expect(requests[0]?.options[0]?.fields).toEqual([
      { key: "DEMO_SECRET", label: "DEMO_SECRET", hint: "From the portal", placeholder: "", secret: true },
    ]);
    expect(requests[0]?.options[0]?.actions).toEqual([
      { type: "link", label: "Open the portal", url: "https://portal.example.com" },
    ]);
    const owner = { name: manifest.name, category: manifest.category };
    expect(await secretStore.get(owner, "DEMO_SECRET")).toBe("s-1");
    expect(await secretStore.get(owner, "DEMO_ID")).toBeUndefined();
  });

  it("does not save what was entered when the upstream fails to start", async () => {
    const env = { USEMCPKIT_HOME: readHome() };
    const secretStore = createFileSecretStore(env);
    const { requestCredentials } = createForm({ DEMO_ID: "id-1", DEMO_SECRET: "s-1" });
    const manifest = createFormManifest();

    await expect(
      withUpstreamAccess(
        manifest,
        async () => {
          throw new Error("could not start");
        },
        { env, secretStore, requestCredentials },
      ),
    ).rejects.toThrow("could not start");

    expect(await secretStore.get({ name: manifest.name, category: manifest.category }, "DEMO_ID")).toBeUndefined();
  });

  it("reads saved credentials without asking again", async () => {
    const env = { USEMCPKIT_HOME: readHome() };
    const secretStore = createFileSecretStore(env);
    const manifest = createFormManifest();
    const first = createForm({ DEMO_ID: "id-1", DEMO_SECRET: "s-1" });
    await withUpstreamAccess(manifest, async () => "started", {
      env,
      secretStore,
      requestCredentials: first.requestCredentials,
    });
    const second = createForm({});

    const forwarded = await withUpstreamAccess(manifest, async (access) => access.env, {
      env,
      secretStore,
      requestCredentials: second.requestCredentials,
    });

    expect(forwarded).toEqual({ DEMO_ID: "id-1", DEMO_SECRET: "s-1" });
    expect(second.requests).toEqual([]);
  });

  it("rejects a form answer that leaves a credential empty", async () => {
    const env = { USEMCPKIT_HOME: readHome() };
    const { requestCredentials } = createForm({ DEMO_ID: "id-1", DEMO_SECRET: " " });

    await expect(
      withUpstreamAccess(createFormManifest(), async () => "never", { env, requestCredentials }),
    ).rejects.toBeInstanceOf(AuthError);
  });
});
