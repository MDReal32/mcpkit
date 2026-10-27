import { createHash } from "node:crypto";
import { readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createPingManifest, useTempDir } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import { executeTool, signIn, validateManifest } from "../src/main";
import { createRecordingFetch } from "./fixtures/create-recording-fetch";
import { DEMO_TOKEN_URL, demoOAuth } from "./fixtures/demo-oauth";

const readHome = useTempDir("mcpkit-oauth-");

const callPing = (fetchImpl: typeof fetch) => {
  const manifest = createPingManifest("1.0.0", "", "demo", [demoOAuth]);
  const [tool] = manifest.tools;
  if (!tool) {
    throw new Error("ping manifest has no tool");
  }
  return executeTool(manifest, tool, {}, { env: { MCPKIT_HOME: readHome() }, fetchImpl });
};

const readTokensFile = async () => {
  const data: unknown = JSON.parse(await readFile(join(readHome(), "tokens.json"), "utf8"));
  return data;
};

describe("oauth manifest validation", () => {
  it("accepts a PKCE auth block", () => {
    expect(validateManifest(createPingManifest("1.0.0", "", "demo", [demoOAuth]))).toEqual([]);
  });

  it("rejects insecure endpoints and bad ports", () => {
    const auth = { ...demoOAuth, tokenUrl: "http://auth.example.com/token", redirectPort: 70_000 };

    expect(validateManifest({ ...createPingManifest("1.0.0"), auth: [auth] })).toEqual([
      "auth[0].tokenUrl must be an https:// URL",
      "auth[0].redirectPort must be an integer between 0 and 65535",
    ]);
  });
});

describe("signIn with provider-specific client handling", () => {
  it("adds authorization params and sends the client over HTTP Basic with token headers", async () => {
    const { recordingFetch, requests } = createRecordingFetch({
      [DEMO_TOKEN_URL]: { access_token: "at-1", token_type: "bearer", refresh_token: "rt-1", expires_in: 3600 },
    });
    const auth = {
      ...demoOAuth,
      authorizationParams: { duration: "permanent" },
      clientAuthentication: "basic",
      tokenHeaders: { "User-Agent": "mcpkit-test" },
    } as const;
    const authorizationUrls: URL[] = [];
    const callbacks: Promise<Response>[] = [];

    await signIn("demo", auth, {
      context: { env: { MCPKIT_HOME: readHome() }, fetchImpl: recordingFetch },
      onAuthorizationUrl: (url) => {
        const authorizationUrl = new URL(url);
        authorizationUrls.push(authorizationUrl);
        const redirectUri = authorizationUrl.searchParams.get("redirect_uri") ?? "";
        const state = authorizationUrl.searchParams.get("state") ?? "";
        callbacks.push(fetch(`${redirectUri}?code=code-1&state=${state}`));
      },
    });

    await callbacks[0];
    expect(authorizationUrls[0]?.searchParams.get("duration")).toBe("permanent");
    const [request] = requests;
    expect(request?.headers.get("authorization")).toBe(`Basic ${Buffer.from("client-1:").toString("base64")}`);
    expect(request?.headers.get("user-agent")).toBe("mcpkit-test");
    expect(new URLSearchParams(request?.body).has("client_id")).toBe(false);
  });
});

describe("signIn", () => {
  it("runs the PKCE flow through the loopback callback and stores the token", async () => {
    const { recordingFetch, requests } = createRecordingFetch({
      [DEMO_TOKEN_URL]: { access_token: "at-1", token_type: "bearer", refresh_token: "rt-1", expires_in: 3600 },
    });
    const callbacks: Promise<Response>[] = [];
    const authorizationUrls: URL[] = [];

    const { token, tokensFile } = await signIn("demo", demoOAuth, {
      context: { env: { MCPKIT_HOME: readHome() }, fetchImpl: recordingFetch },
      onAuthorizationUrl: (url) => {
        const authorizationUrl = new URL(url);
        authorizationUrls.push(authorizationUrl);
        const redirectUri = authorizationUrl.searchParams.get("redirect_uri") ?? "";
        const state = authorizationUrl.searchParams.get("state") ?? "";
        callbacks.push(fetch(`${redirectUri}?code=code-1&state=${state}`));
      },
    });

    const [authorizationUrl] = authorizationUrls;
    expect(authorizationUrl?.searchParams.get("client_id")).toBe("client-1");
    expect(authorizationUrl?.searchParams.get("scope")).toBe("repo user");
    expect(authorizationUrl?.searchParams.get("code_challenge_method")).toBe("S256");
    expect((await callbacks[0])?.status).toBe(200);
    const form = new URLSearchParams(requests[0]?.body);
    expect(form.get("grant_type")).toBe("authorization_code");
    expect(form.get("code")).toBe("code-1");
    const verifier = form.get("code_verifier") ?? "";
    expect(createHash("sha256").update(verifier).digest("base64url")).toBe(
      authorizationUrl?.searchParams.get("code_challenge"),
    );
    expect(token.accessToken).toBe("at-1");
    expect(tokensFile).toBe(join(readHome(), "tokens.json"));
    expect(await readTokensFile()).toMatchObject({ demo: { accessToken: "at-1", refreshToken: "rt-1" } });
    expect((await stat(tokensFile)).mode & 0o777).toBe(0o600);
  });

  it("rejects a callback with a foreign state", async () => {
    const { recordingFetch } = createRecordingFetch({});

    const signingIn = signIn("demo", demoOAuth, {
      context: { env: { MCPKIT_HOME: readHome() }, fetchImpl: recordingFetch },
      onAuthorizationUrl: (url) => {
        const redirectUri = new URL(url).searchParams.get("redirect_uri") ?? "";
        void fetch(`${redirectUri}?code=code-1&state=forged`);
      },
    });

    await expect(signingIn).rejects.toThrow(/state mismatch/);
  });
});

describe("oauth token use", () => {
  it("fails without a stored token when the caller cannot open a browser", async () => {
    const { recordingFetch } = createRecordingFetch({});

    const resolving = callPing(recordingFetch);

    await expect(resolving).rejects.toThrow("tokens.json: demo: not signed in yet");
    await expect(resolving).rejects.toThrow("auth[0] oauth pkce sign-in: demo: sign-in needs a browser");
  });

  it("refreshes an expired token once, keeps the refresh token and calls the API with the new token", async () => {
    const tokens = { demo: { accessToken: "old", tokenType: "bearer", refreshToken: "rt-1", expiresAt: 0 } };
    await writeFile(join(readHome(), "tokens.json"), JSON.stringify(tokens));
    const { recordingFetch, requests } = createRecordingFetch({
      [DEMO_TOKEN_URL]: { access_token: "new", token_type: "bearer", expires_in: 3600 },
      "https://api.example.com/ping": { pong: true },
    });
    const manifest = createPingManifest("1.0.0", "", "demo", [demoOAuth]);
    const [tool] = manifest.tools;
    const options = { env: { MCPKIT_HOME: readHome() }, fetchImpl: recordingFetch };

    const results = await Promise.all([
      tool && executeTool(manifest, tool, {}, options),
      tool && executeTool(manifest, tool, {}, options),
    ]);

    expect(results).toEqual([{ pong: true }, { pong: true }]);
    expect(requests.filter(({ url }) => url === DEMO_TOKEN_URL)).toHaveLength(1);
    expect(
      requests.filter(({ url }) => url.endsWith("/ping")).map(({ headers }) => headers.get("authorization")),
    ).toEqual(["Bearer new", "Bearer new"]);
    expect(await readTokensFile()).toMatchObject({ demo: { accessToken: "new", refreshToken: "rt-1" } });
  });

  it("surfaces provider errors reported with HTTP 200", async () => {
    const tokens = { demo: { accessToken: "old", tokenType: "bearer", refreshToken: "rt-1", expiresAt: 0 } };
    await writeFile(join(readHome(), "tokens.json"), JSON.stringify(tokens));
    const { recordingFetch } = createRecordingFetch({
      [DEMO_TOKEN_URL]: { error: "bad_refresh_token", error_description: "The refresh token is invalid" },
    });

    const resolving = callPing(recordingFetch);

    await expect(resolving).rejects.toThrow("demo: token request failed: The refresh token is invalid");
  });

  it("refuses a malformed tokens file instead of overwriting it", async () => {
    await writeFile(join(readHome(), "tokens.json"), JSON.stringify({ demo: { accessToken: 1 } }));
    const { recordingFetch } = createRecordingFetch({});

    const resolving = callPing(recordingFetch);

    await expect(resolving).rejects.toThrow(/is not a valid tokens file/);
  });
});
