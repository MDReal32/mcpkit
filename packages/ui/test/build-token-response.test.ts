import type { CredentialRequest } from "@usemcpkit/core";
import { DEFAULT_UI_TEXTS } from "@usemcpkit/core";
import { describe, expect, it } from "vitest";
import { buildSignInResponse } from "../src/form/build-sign-in-response";
import { buildTokenImportRequest } from "../src/form/build-token-import-request";
import { buildTokenResponse } from "../src/form/build-token-response";
import { createFormDraft } from "../src/form/create-form-draft";
import { resolveVisibleActions } from "../src/form/resolve-visible-actions";

const field = { label: "Access token", hint: "", placeholder: "", secret: true };

const request: CredentialRequest = {
  serverName: "github",
  texts: DEFAULT_UI_TEXTS,
  domain: { label: "API host", hint: "", placeholder: "", value: "api.github.com" },
  domainInUse: "api.github.com",
  options: [
    { index: 0, label: "bearer GITHUB_TOKEN", fields: [{ ...field, key: "GITHUB_TOKEN" }], actions: [] },
    { index: 1, label: "bearer OTHER_TOKEN", fields: [{ ...field, key: "OTHER_TOKEN" }], actions: [] },
  ],
  signIn: true,
};

describe("credentials form answers", () => {
  it("starts from the first option, empty fields and the prefilled domain", () => {
    expect(createFormDraft(request)).toEqual({
      option: 0,
      values: { GITHUB_TOKEN: "", OTHER_TOKEN: "" },
      domain: "api.github.com",
    });
  });

  it("sends only the chosen option values and the trimmed domain", () => {
    const draft = { option: 1, values: { GITHUB_TOKEN: "a", OTHER_TOKEN: "b" }, domain: " ghe.example.com " };

    expect(buildTokenResponse(request, draft)).toEqual({
      method: "token",
      option: 1,
      values: { OTHER_TOKEN: "b" },
      domain: "ghe.example.com",
    });
    expect(buildSignInResponse(request, draft)).toEqual({ method: "sign-in", domain: "ghe.example.com" });
  });

  it("leaves the domain out when the form does not offer it", () => {
    const { domain: _domain, ...withoutDomain } = request;

    expect(buildSignInResponse(withoutDomain, createFormDraft(withoutDomain))).toEqual({ method: "sign-in" });
  });
});

describe("option actions", () => {
  const option = {
    index: 0,
    label: "bearer GITHUB_TOKEN",
    fields: [{ ...field, key: "GITHUB_TOKEN" }],
    actions: [
      { type: "link" as const, label: "Create", url: "https://{webHost}/new" },
      { type: "link" as const, label: "Needs nothing typed", url: "https://{domain}/x" },
      { type: "cli" as const, label: "Use CLI", command: "gh", args: ["auth", "token"] },
    ],
  };
  const githubRequest: CredentialRequest = { ...request, options: [option] };

  it("asks the CLI for the chosen option, the action and the trimmed domain", () => {
    const draft = { option: 0, values: {}, domain: " ghe.example.com/api/v3 " };

    expect(buildTokenImportRequest(githubRequest, draft, 2)).toEqual({
      option: 0,
      action: 2,
      domain: "ghe.example.com/api/v3",
    });
  });

  it("follows a valid typed domain and keeps the last good one while typing", () => {
    const typed = resolveVisibleActions(
      githubRequest,
      { option: 0, values: {}, domain: "ghe.example.com/api/v3" },
      option,
    );
    const partial = resolveVisibleActions(githubRequest, { option: 0, values: {}, domain: "ghe." }, option);

    expect(typed.map((action) => action.href)).toEqual([
      "https://ghe.example.com/new",
      "https://ghe.example.com/api/v3/x",
      undefined,
    ]);
    expect(partial[0]?.href).toBe("https://github.com/new");
    expect(resolveVisibleActions(request, createFormDraft(request), request.options[0])).toEqual([]);
  });

  it("hides a link that needs a domain while there is none", () => {
    const { domain: _domain, domainInUse: _inUse, ...withoutDomain } = githubRequest;

    expect(resolveVisibleActions(withoutDomain, createFormDraft(withoutDomain), option).map((a) => a.label)).toEqual([
      "Use CLI",
    ]);
  });
});
