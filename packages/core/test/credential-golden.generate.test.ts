import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "vitest";
import {
  CREDENTIALS_FORM_API,
  CREDENTIALS_FORM_SESSION_HEADER,
  CREDENTIALS_REQUEST_ELEMENT_ID,
} from "../src/auth/const";
import { buildCredentialRequest } from "../src/auth/credentials/request/build-credential-request";
import { validateCredentialResponse } from "../src/auth/credentials/response/validate-credential-response";
import type { Env } from "../src/env";
import type { Manifest } from "../src/manifest";

const REGISTRY = join(__dirname, "../../servers/build/manifests");
const OUTPUT = process.env.CREDENTIAL_GOLDEN_OUTPUT ?? "";

const KNOWN_HOSTS: readonly string[] = ["a.example.com", "b.example.com/path"];

interface RequestCase {
  label: string;
  manifest: Manifest;
  domain: string | null;
  knownHosts: readonly string[];
  env: Env;
  request: unknown;
}

interface ValidationCase {
  label: string;
  request: unknown;
  response: unknown;
  errors: readonly string[];
}

const readJson = (path: string): unknown => JSON.parse(readFileSync(join(REGISTRY, path), "utf8"));

const withoutTools = (shell: Manifest & { parts?: unknown }) => {
  const { parts: _parts, ...manifest } = shell;
  const stripped: Manifest = { ...manifest, tools: [] };
  return stripped;
};

const SYNTHETIC: readonly Manifest[] = [
  {
    name: "my tracker",
    category: "test",
    version: "1.0.0",
    description: "",
    baseUrl: "https://{domain}",
    domain: { env: "TRACKER_HOST", default: "tracker.example.com", label: "Site", matchGitRemote: true },
    ui: { texts: { title: "Link {server} to {foo}", submit: "Go" } },
    auth: [
      {
        type: "oauth",
        authorizationUrl: "https://{domain}/authorize",
        tokenUrl: "https://{domain}/token",
        clientId: "client-1",
        scopes: ["read"],
      },
      {
        type: "bearer",
        env: "TRACKER_TOKEN",
        label: "Personal token",
        ui: {
          inputs: { TRACKER_TOKEN: { label: "Token", hint: "From {webHost}", placeholder: "tk_" } },
          actions: [
            { type: "link", label: "Create one", url: "https://{webHost}/tokens?for={server}" },
            { type: "cli", label: "From the CLI", command: "tracker", args: ["auth", "token", "--host", "{webHost}"] },
          ],
        },
      },
      {
        type: "basic",
        usernameEnv: "TRACKER_USER",
        passwordEnv: "TRACKER_PASSWORD",
        ui: {
          inputs: { TRACKER_USER: { secret: true } },
          actions: [{ type: "cli", label: "Dropped", command: "tracker", args: [] }],
        },
      },
      { type: "header", name: "X-Api-Key", env: "TRACKER_KEY" },
      { type: "query", name: "api_key", env: "TRACKER_QUERY_KEY" },
      { type: "none" },
    ],
    tools: [],
  },
  {
    name: "plain",
    category: "test",
    version: "1.0.0",
    description: "",
    baseUrl: "https://api.example.com",
    auth: [{ type: "bearer", env: "PLAIN_TOKEN" }],
    tools: [],
  },
];

const requestCases = (manifest: Manifest) => {
  const states: { label: string; domain: string | null; knownHosts: readonly string[]; env: Env }[] = [
    { label: "nothing known", domain: null, knownHosts: [], env: {} },
  ];
  if (manifest.domain) {
    states.push({ label: "domain and known hosts", domain: "a.example.com", knownHosts: KNOWN_HOSTS, env: {} });
    if (manifest.domain.env) {
      states.push({
        label: "domain from its env var",
        domain: "env.example.com",
        knownHosts: [],
        env: { [manifest.domain.env]: "env.example.com" },
      });
    }
  }
  return states.map(
    (state): RequestCase => ({
      ...state,
      label: `${manifest.category}:${manifest.name} ${state.label}`,
      manifest,
      request: buildCredentialRequest(manifest, state.domain ?? undefined, state.knownHosts, state.env),
    }),
  );
};

const RESPONSES: readonly { label: string; response: unknown }[] = [
  { label: "not an object", response: "token" },
  { label: "an array", response: [] },
  { label: "null", response: null },
  { label: "no method", response: {} },
  { label: "a bad method", response: { method: "magic" } },
  { label: "sign-in", response: { method: "sign-in" } },
  { label: "sign-in with a domain", response: { method: "sign-in", domain: "c.example.com" } },
  { label: "sign-in with a bad domain", response: { method: "sign-in", domain: "https://c.example.com" } },
  { label: "sign-in with a numeric domain", response: { method: "sign-in", domain: 7 } },
  { label: "an unknown option", response: { method: "token", option: 9, values: {} } },
  { label: "a string option", response: { method: "token", option: "1", values: {} } },
  { label: "a token", response: { method: "token", option: 1, values: { TRACKER_TOKEN: "t" } } },
  { label: "a blank token", response: { method: "token", option: 1, values: { TRACKER_TOKEN: "  " } } },
  { label: "values not strings", response: { method: "token", option: 1, values: { TRACKER_TOKEN: 5 } } },
  { label: "no values", response: { method: "token", option: 2 } },
  {
    label: "half of basic with a domain",
    response: { method: "token", option: 2, values: { TRACKER_USER: "u" }, domain: "c.example.com" },
  },
  { label: "a token with a bad domain", response: { method: "token", option: 3, values: {}, domain: "" } },
];

it.skipIf(OUTPUT === "")("writes the credentials form golden file", () => {
  const index = readJson("index.json") as { servers: { id: string; upstream?: unknown }[] };
  const registry = index.servers
    .filter((server) => !server.upstream)
    .map((server) => withoutTools(readJson(`${server.id.replace(":", "/")}.json`) as Manifest));
  const requests = [...registry, ...SYNTHETIC].flatMap(requestCases);
  const validations = SYNTHETIC.flatMap((manifest) =>
    [undefined, "a.example.com"].flatMap((domain) => {
      const request = buildCredentialRequest(manifest, domain, [], {});
      return RESPONSES.map(
        ({ label, response }): ValidationCase => ({
          label: `${manifest.name} ${domain ?? "no domain"}: ${label}`,
          request,
          response,
          errors: validateCredentialResponse(request, response),
        }),
      );
    }),
  );
  const constants = {
    api: CREDENTIALS_FORM_API,
    sessionHeader: CREDENTIALS_FORM_SESSION_HEADER,
    requestElementId: CREDENTIALS_REQUEST_ELEMENT_ID,
  };
  writeFileSync(OUTPUT, `${JSON.stringify({ constants, requests, validations }, null, 1)}\n`);
});
