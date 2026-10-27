import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createPingManifest, useTempDir } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { AuthSpec, CredentialRequest, CredentialResponse, ExecuteOptions, Manifest } from "../src/main";
import { DEFAULT_UI_TEXTS, executeTool, validateCredentialResponse, validateManifest } from "../src/main";
import { approveSignIn } from "./fixtures/approve-sign-in";
import { createHostCheckingFetch } from "./fixtures/create-host-checking-fetch";
import { createMemorySecretStore } from "./fixtures/create-memory-secret-store";
import { demoOAuth } from "./fixtures/demo-oauth";

const readHome = useTempDir("mcpkit-credentials-form-");

const tokenAuth: readonly AuthSpec[] = [{ type: "bearer", env: "DEMO_TOKEN" }];

const createDomainManifest = (name: string, auth: readonly AuthSpec[] = tokenAuth) => {
  const manifest: Manifest = {
    ...createPingManifest("1.0.0", "", name, auth),
    baseUrl: "https://{domain}/api",
    domain: { label: "API host", default: "api.example.com", env: "DEMO_DOMAIN" },
  };
  return manifest;
};

const createCall = (manifest: Manifest, validToken: string, options: ExecuteOptions) => {
  const fetches = createHostCheckingFetch(validToken, {
    "https://ghe.example.com/token": { access_token: "signed-in", token_type: "bearer" },
  });
  const [tool] = manifest.tools;
  if (!tool) {
    throw new Error("manifest has no tool");
  }
  const call = () =>
    executeTool(
      manifest,
      tool,
      {},
      {
        ...options,
        env: { MCPKIT_HOME: readHome(), ...options.env },
        fetchImpl: fetches.hostCheckingFetch,
      },
    );
  return { call, ...fetches };
};

const answerWith = (response: CredentialResponse) => {
  const requests: CredentialRequest[] = [];
  const requestCredentials = async (request: CredentialRequest) => {
    requests.push(request);
    return response;
  };
  return { requestCredentials, requests };
};

describe("credentials form", () => {
  it("asks for a token when none is provided, saves it once the API accepts it and reuses it", async () => {
    const { secretStore, saved } = createMemorySecretStore();
    const { requestCredentials, requests } = answerWith({
      method: "token",
      option: 0,
      values: { DEMO_TOKEN: " typed " },
    });
    const { call, sentAuthorizations } = createCall(createPingManifest("1.0.0", "", "asks", tokenAuth), "typed", {
      secretStore,
      requestCredentials,
    });

    expect(await call()).toEqual({ pong: true });
    expect(await call()).toEqual({ pong: true });

    expect(requests).toEqual([
      {
        serverName: "asks",
        texts: {
          ...DEFAULT_UI_TEXTS,
          title: "Connect asks",
          savedTitle: "asks is connected",
          signingInBody: expect.stringContaining("access to asks"),
          intro: expect.stringContaining("asks"),
        },
        options: [
          {
            index: 0,
            label: "bearer DEMO_TOKEN",
            fields: [
              {
                key: "DEMO_TOKEN",
                label: "Access token",
                hint: "Or set the DEMO_TOKEN environment variable.",
                placeholder: "",
                secret: true,
              },
            ],
            actions: [],
          },
        ],
        signIn: false,
      },
    ]);
    expect(sentAuthorizations).toEqual(["Bearer typed", "Bearer typed"]);
    expect(saved.get("test:asks:DEMO_TOKEN")).toBe("typed");
  });

  it("uses the env var without asking", async () => {
    const { requestCredentials, requests } = answerWith({
      method: "token",
      option: 0,
      values: { DEMO_TOKEN: "typed" },
    });
    const { call } = createCall(createPingManifest("1.0.0", "", "env_wins", tokenAuth), "from-env", {
      env: { DEMO_TOKEN: "from-env" },
      requestCredentials,
    });

    expect(await call()).toEqual({ pong: true });
    expect(requests).toHaveLength(0);
  });

  it("does not save a token the API rejects", async () => {
    const { secretStore, saved } = createMemorySecretStore();
    const { requestCredentials } = answerWith({ method: "token", option: 0, values: { DEMO_TOKEN: "wrong" } });
    const { call } = createCall(createPingManifest("1.0.0", "", "rejected", tokenAuth), "right", {
      secretStore,
      requestCredentials,
    });

    await expect(call()).rejects.toThrow("credentials form: API answered 401: Bad credentials");
    expect(saved.size).toBe(0);
  });

  it("shares one open form between concurrent calls", async () => {
    const { requestCredentials, requests } = answerWith({
      method: "token",
      option: 0,
      values: { DEMO_TOKEN: "typed" },
    });
    const { call } = createCall(createPingManifest("1.0.0", "", "shared", tokenAuth), "typed", { requestCredentials });

    await Promise.all([call(), call(), call()]);

    expect(requests).toHaveLength(1);
  });

  it("fills {domain} from the form, prefilled with the default, and saves it", async () => {
    const { secretStore, saved } = createMemorySecretStore();
    const { requestCredentials, requests } = answerWith({
      method: "token",
      option: 0,
      values: { DEMO_TOKEN: "typed" },
      domain: "ghe.example.com",
    });
    const { call, sentHosts } = createCall(createDomainManifest("custom_domain"), "typed", {
      secretStore,
      requestCredentials,
    });

    expect(await call()).toEqual({ pong: true });
    expect(await call()).toEqual({ pong: true });

    expect(requests[0]?.domain).toEqual({
      label: "API host",
      hint: DEFAULT_UI_TEXTS.domainHint,
      placeholder: DEFAULT_UI_TEXTS.domainPlaceholder,
      value: "api.example.com",
    });
    expect(requests).toHaveLength(1);
    expect(sentHosts).toEqual(["ghe.example.com", "ghe.example.com"]);
    expect(saved.size).toBe(1);
    expect(JSON.parse(await readFile(join(readHome(), "config.json"), "utf8"))).toEqual({
      servers: { custom_domain: { domain: "ghe.example.com", hosts: { "ghe.example.com": {} } } },
    });
  });

  it("takes the domain from its env var and then does not offer it in the form", async () => {
    const { requestCredentials, requests } = answerWith({
      method: "token",
      option: 0,
      values: { DEMO_TOKEN: "typed" },
    });
    const { call, sentHosts } = createCall(createDomainManifest("env_domain"), "typed", {
      env: { DEMO_DOMAIN: "env.example.com" },
      requestCredentials,
    });

    expect(await call()).toEqual({ pong: true });
    expect(requests[0]?.domain).toBeUndefined();
    expect(sentHosts).toEqual(["env.example.com"]);
  });

  it("signs in with OAuth2 against the chosen domain", async () => {
    const oauth: AuthSpec = {
      ...demoOAuth,
      authorizationUrl: "https://{domain}/authorize",
      tokenUrl: "https://{domain}/token",
    };
    const { requestCredentials, requests } = answerWith({ method: "sign-in", domain: "ghe.example.com" });
    const { call, sentHosts } = createCall(createDomainManifest("form_sign_in", [oauth, ...tokenAuth]), "signed-in", {
      requestCredentials,
      onAuthorizationUrl: (url) => {
        expect(new URL(url).host).toBe("ghe.example.com");
        approveSignIn(url);
      },
    });

    expect(await call()).toEqual({ pong: true });
    expect(requests[0]?.signIn).toBe(true);
    expect(sentHosts).toEqual(["ghe.example.com"]);
  });

  it("fails with the reason when the answer does not fit the request", async () => {
    const { requestCredentials } = answerWith({ method: "token", option: 3, values: {} });
    const { call } = createCall(createPingManifest("1.0.0", "", "bad_answer", tokenAuth), "typed", {
      requestCredentials,
    });

    await expect(call()).rejects.toThrow("invalid credentials form answer: choose one of the offered credentials");
  });
});

describe("validateCredentialResponse", () => {
  const request: CredentialRequest = {
    serverName: "demo",
    texts: DEFAULT_UI_TEXTS,
    domain: { label: "API host", hint: "", placeholder: "", value: "" },
    options: [
      {
        index: 1,
        label: "basic USER, PASS",
        fields: [
          { key: "USER", label: "Username", hint: "", placeholder: "", secret: false },
          { key: "PASS", label: "Password", hint: "", placeholder: "", secret: true },
        ],
        actions: [],
      },
    ],
    signIn: false,
  };

  it("reports missing fields, a bad domain and an unavailable sign-in", () => {
    expect(
      validateCredentialResponse(request, {
        method: "token",
        option: 1,
        values: { USER: "me" },
        domain: "ok.example.com",
      }),
    ).toEqual(["Password is required"]);
    expect(validateCredentialResponse(request, { method: "sign-in", domain: "https://x" })).toEqual([
      "this server has no sign-in",
      "API host must look like host[:port][/path]",
    ]);
    expect(validateCredentialResponse(request, "nope")).toEqual(["the answer must be a JSON object"]);
  });
});

describe("domain validation", () => {
  it("requires domain when a URL uses {domain} and rejects an unused or malformed one", () => {
    const manifest = createDomainManifest("valid_domain");
    const { domain: _domain, ...withoutDomain } = manifest;

    expect(validateManifest(manifest)).toEqual([]);
    expect(validateManifest(withoutDomain)).toEqual(["domain is required when a URL uses {domain}"]);
    expect(validateManifest({ ...manifest, baseUrl: "https://api.example.com", domain: { default: "a b" } })).toEqual([
      "domain is set but no URL uses {domain}",
      "domain.default must look like host[:port][/path]",
    ]);
  });
});
