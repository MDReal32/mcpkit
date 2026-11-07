import type { CredentialOption, CredentialRequest } from "@usemcpkit/core";
import { DEFAULT_UI_TEXTS } from "@usemcpkit/core";
import { describe, expect, it } from "vitest";
import { buildMethods } from "../src/form/build-methods";
import { buildTokenImportRequest } from "../src/form/build-token-import-request";
import { buildTokenResponse } from "../src/form/build-token-response";
import { createFormDraft } from "../src/form/create-form-draft";
import { pickMethodOption } from "../src/form/pick-method-option";

const field = { label: "Token", hint: "", placeholder: "", secret: true };

const cli = (label: string) => ({ type: "cli" as const, label, command: "tool", args: ["token"] });

const link = { type: "link" as const, label: "Create a token", url: "https://example.com/new" };

const token: CredentialOption = {
  index: 1,
  label: "API token",
  fields: [{ ...field, key: "API_TOKEN" }],
  actions: [link, cli("Use the CLI token")],
};

const key: CredentialOption = {
  index: 3,
  label: "API key",
  fields: [{ ...field, key: "API_KEY" }],
  actions: [cli("Use the CLI key"), cli("Use the other CLI key")],
};

const request: CredentialRequest = {
  serverName: "demo",
  texts: { ...DEFAULT_UI_TEXTS, signInLabel: "Connect with Demo" },
  options: [token, key],
  signIn: true,
};

describe("connection methods", () => {
  it("lists the sign-in, then each option followed by its CLI imports", () => {
    expect(buildMethods(request).map(({ type, label }) => [type, label])).toEqual([
      ["sign-in", "Connect with Demo"],
      ["manual", "API token"],
      ["cli", "Use the CLI token"],
      ["manual", "API key"],
      ["cli", "Use the CLI key"],
      ["cli", "Use the other CLI key"],
    ]);
  });

  it("keeps the auth option index and the action index of every CLI import", () => {
    const imports = buildMethods(request).filter((method) => method.type === "cli");

    expect(imports.map((method) => [method.key, method.option, method.action])).toEqual([
      ["cli:1:1", 1, 1],
      ["cli:3:0", 3, 0],
      ["cli:3:1", 3, 1],
    ]);
  });

  it("lists a single method when the server offers one", () => {
    const onlyToken: CredentialRequest = { ...request, options: [{ ...token, actions: [link] }], signIn: false };
    const onlySignIn: CredentialRequest = { ...request, options: [], signIn: true };

    expect(buildMethods(onlyToken).map((method) => method.key)).toEqual(["manual:1"]);
    expect(buildMethods(onlySignIn).map((method) => method.key)).toEqual(["sign-in"]);
  });

  it("has no method for a request that needs nothing", () => {
    const nothing: CredentialRequest = { ...request, options: [], signIn: false };

    expect(buildMethods(nothing)).toEqual([]);
    expect(createFormDraft(nothing)).toEqual({ option: -1, method: "", values: {}, domain: "" });
  });
});

describe("answers of the chosen method", () => {
  it("starts on the first method and answers for the option it belongs to", () => {
    const firstToken: CredentialRequest = { ...request, signIn: false };
    const draft = createFormDraft(firstToken);

    expect(draft).toMatchObject({ method: "manual:1", option: 1 });
  });

  it("answers a CLI import with the option and the action of that method", () => {
    const method = buildMethods(request).find((candidate) => candidate.key === "cli:3:1");
    const draft = {
      ...createFormDraft(request),
      method: "cli:3:1",
      option: method ? (pickMethodOption(method) ?? -1) : -1,
    };

    expect(draft.option).toBe(3);
    expect(method?.type === "cli" && buildTokenImportRequest(request, draft, method.action)).toEqual({
      option: 3,
      action: 1,
    });
  });

  it("answers manual credentials with only the fields of the chosen option", () => {
    const draft = {
      ...createFormDraft(request),
      method: "manual:3",
      option: 3,
      values: { API_TOKEN: "t", API_KEY: "k" },
    };

    expect(buildTokenResponse(request, draft)).toEqual({ method: "token", option: 3, values: { API_KEY: "k" } });
  });

  it("belongs to no option while the sign-in is chosen", () => {
    expect(buildMethods(request).map(pickMethodOption)).toEqual([undefined, 1, 1, 3, 3, 3]);
  });
});
