import { chmod, writeFile } from "node:fs/promises";
import { delimiter, join } from "node:path";
import type { CredentialRequest } from "@usemcpkit/core";
import { CREDENTIALS_FORM_API, CREDENTIALS_FORM_SESSION_HEADER, DEFAULT_UI_TEXTS } from "@usemcpkit/core";
import { useTempDir } from "@usemcpkit/testing";
import { afterEach, describe, expect, it } from "vitest";
import { createCredentialsForm } from "../src/main";

const field = { key: "DEMO_TOKEN", label: "Access token", hint: "", placeholder: "", secret: true };

const request: CredentialRequest = {
  serverName: "demo",
  texts: DEFAULT_UI_TEXTS,
  options: [{ index: 0, label: "bearer DEMO_TOKEN", fields: [field], actions: [] }],
  signIn: false,
};

const githubRequest: CredentialRequest = {
  serverName: "github",
  texts: DEFAULT_UI_TEXTS,
  domain: { label: "API host", hint: "", placeholder: "", value: "api.github.com", knownHosts: [] },
  domainInUse: "api.github.com",
  options: [
    {
      index: 0,
      label: "bearer GITHUB_TOKEN",
      fields: [{ ...field, key: "GITHUB_TOKEN" }],
      actions: [
        { type: "cli", label: "Use GitHub CLI", command: "gh", args: ["auth", "token", "--hostname", "{webHost}"] },
      ],
    },
  ],
  signIn: false,
};

/** Prints a token for github.com and fails like `gh` does for hosts it is not logged in to. */
const FAKE_GH_SCRIPT = `#!/bin/sh
if [ "$4" = "github.com" ]; then echo "gho_from_cli"; exit 0; fi
echo "no oauth token found for $4" >&2
exit 1
`;

const readBinDir = useTempDir("mcpkit-fake-gh-");

const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
});

const PAGE = '<script type="application/json" id="mcpkit-request"></script><p>form</p>';

const openForm = (timeoutMs?: number, formRequest: CredentialRequest = request) => {
  let announce: (url: URL) => void = () => undefined;
  const announced = new Promise<URL>((resolve) => {
    announce = resolve;
  });
  const answer = createCredentialsForm({ page: PAGE, onUrl: (url) => announce(new URL(url)), timeoutMs })(formRequest);
  return { answer, announced };
};

const readInjectedRequest = async (url: URL) => {
  const page = await (await fetch(url)).text();
  const injected = /<script type="application\/json" id="mcpkit-request">(.*)<\/script>/.exec(page)?.[1];
  return JSON.parse(injected ?? "");
};

const callApi = (url: URL, path: string, init: RequestInit = {}) =>
  fetch(new URL(path, url), {
    ...init,
    headers: { [CREDENTIALS_FORM_SESSION_HEADER]: url.hash.slice(1), ...init.headers },
  });

describe("createCredentialsForm", () => {
  it("serves the page with the request injected, then resolves with a valid answer", async () => {
    const { answer, announced } = openForm();
    const url = await announced;

    expect(await readInjectedRequest(url)).toEqual(request);
    const submitted = { method: "token", option: 0, values: { DEMO_TOKEN: "abc" } };
    expect(
      (await callApi(url, CREDENTIALS_FORM_API.submit, { method: "POST", body: JSON.stringify(submitted) })).status,
    ).toBe(200);
    await expect(answer).resolves.toEqual(submitted);
  });

  it("answers invalid submissions with errors and keeps waiting", async () => {
    const { answer, announced } = openForm();
    const url = await announced;

    const rejected = await callApi(url, CREDENTIALS_FORM_API.submit, {
      method: "POST",
      body: JSON.stringify({ method: "token", option: 0, values: {} }),
    });

    expect(rejected.status).toBe(400);
    expect(await rejected.json()).toEqual({ errors: ["Access token is required"] });
    const closed = expect(answer).rejects.toThrow(/closed without an answer/);
    await callApi(url, CREDENTIALS_FORM_API.cancel, { method: "POST" });
    await closed;
  });

  it("refuses API calls without the session token", async () => {
    const { answer, announced } = openForm();
    const url = await announced;

    expect((await fetch(new URL(CREDENTIALS_FORM_API.submit, url), { method: "POST" })).status).toBe(403);
    const closed = expect(answer).rejects.toThrow();
    await callApi(url, CREDENTIALS_FORM_API.cancel, { method: "POST" });
    await closed;
  });

  it("fails when the page has no request element", async () => {
    await expect(createCredentialsForm({ page: "<p>x</p>", onUrl: () => undefined })(request)).rejects.toThrow(
      /mcpkit-request/,
    );
  });

  it("gives up after the timeout", async () => {
    const { answer } = openForm(20);

    await expect(answer).rejects.toThrow(/timed out/);
  });

  it("imports a token from the GitHub CLI and answers the form with it", async () => {
    const gh = join(readBinDir(), "gh");
    await writeFile(gh, FAKE_GH_SCRIPT);
    await chmod(gh, 0o755);
    process.env.PATH = `${readBinDir()}${delimiter}${originalPath}`;
    const { answer, announced } = openForm(undefined, githubRequest);
    const url = await announced;
    expect(await readInjectedRequest(url)).toEqual(githubRequest);
    const importToken = (body: unknown) =>
      callApi(url, CREDENTIALS_FORM_API.import, { method: "POST", body: JSON.stringify(body) });

    const refused = await importToken({ option: 0, action: 0, domain: "ghe.example.com/api/v3" });
    expect(refused.status).toBe(400);
    expect(await refused.json()).toEqual({ errors: ["gh: no oauth token found for ghe.example.com"] });
    expect((await importToken({ option: 0, action: 0, domain: "not a host" })).status).toBe(400);

    expect((await importToken({ option: 0, action: 0, domain: " api.github.com " })).status).toBe(200);
    await expect(answer).resolves.toEqual({
      method: "token",
      option: 0,
      values: { GITHUB_TOKEN: "gho_from_cli" },
      domain: "api.github.com",
    });
  });

  it("hides the CLI button and refuses the import when the CLI is not on PATH", async () => {
    await writeFile(join(readBinDir(), "gh"), FAKE_GH_SCRIPT);
    process.env.PATH = readBinDir();
    const { answer, announced } = openForm(undefined, githubRequest);
    const url = await announced;

    const shown = await readInjectedRequest(url);
    const refused = await callApi(url, CREDENTIALS_FORM_API.import, {
      method: "POST",
      body: JSON.stringify({ option: 0, action: 0, domain: "api.github.com" }),
    });

    expect(shown.options[0].actions).toEqual([]);
    expect(refused.status).toBe(400);
    expect(await refused.json()).toEqual({ errors: ["this credential cannot be fetched automatically"] });
    const closed = expect(answer).rejects.toThrow();
    await callApi(url, CREDENTIALS_FORM_API.cancel, { method: "POST" });
    await closed;
  });
});
