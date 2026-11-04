import { describe, expect, it } from "vitest";
import type { UiAction, UiCliAction } from "../src/main";
import { defineUI, fillTemplate, resolveLinkUrl, validateManifest } from "../src/main";
import { demoManifest } from "./fixtures/demo-manifest";

const githubCli: UiCliAction = {
  type: "cli",
  label: "Use GitHub CLI",
  command: "gh",
  args: ["auth", "token", "--hostname", "{webHost}"],
};

const githubLink: UiAction = {
  type: "link",
  label: "Create on GitHub",
  url: "https://{webHost}/settings/personal-access-tokens/new?name=usemcpkit+{server}",
};

describe("fillTemplate", () => {
  it("fills known placeholders and leaves the others", () => {
    expect(fillTemplate("{a} and {b}", { a: "x" })).toBe("x and {b}");
  });
});

describe("resolveLinkUrl", () => {
  it("uses the domain as typed, or its web host", () => {
    expect(resolveLinkUrl("https://{domain}/-/tokens", "git.acme.com/gitlab")).toBe(
      "https://git.acme.com/gitlab/-/tokens",
    );
    expect(resolveLinkUrl("https://{webHost}/t", "api.github.com")).toBe("https://github.com/t");
    expect(resolveLinkUrl("https://{webHost}/t", "api.acme.ghe.com")).toBe("https://acme.ghe.com/t");
    expect(resolveLinkUrl("https://{webHost}/t", "ghe.example.com/api/v3")).toBe("https://ghe.example.com/t");
  });

  it("waits for a domain only when the link needs one", () => {
    expect(resolveLinkUrl("https://{domain}/t", undefined)).toBeUndefined();
    expect(resolveLinkUrl("https://id.example.com/t", undefined)).toBe("https://id.example.com/t");
  });
});

describe("ui validation", () => {
  const withAuth = (auth: readonly unknown[]) =>
    validateManifest({ ...demoManifest, baseUrl: "https://{domain}", domain: { default: "api.example.com" }, auth });

  it("accepts defineUI on the manifest and on token auth", () => {
    const ui = defineUI({
      inputs: { T: { label: "Token", hint: "From settings", placeholder: "ghp_…" } },
      actions: [githubLink, githubCli],
    });

    expect(withAuth([{ type: "bearer", env: "T", ui }])).toEqual([]);
    expect(
      validateManifest({ ...demoManifest, ui: defineUI({ texts: { title: "Connect {server}", cancel: "Back" } }) }),
    ).toEqual([]);
  });

  it("rejects unknown texts, inputs, placeholders, tools and misplaced keys", () => {
    expect(validateManifest({ ...demoManifest, ui: { texts: { nope: "x", cancel: 1 } } })).toEqual([
      expect.stringContaining("ui.texts.nope is not a text of the page"),
      "ui.texts.cancel must be a string",
    ]);
    expect(withAuth([{ type: "bearer", env: "T", ui: { inputs: { OTHER: {} } } }])).toEqual([
      expect.stringContaining("auth[0].ui.inputs.OTHER"),
    ]);
    expect(
      withAuth([
        { type: "bearer", env: "T", ui: { actions: [{ type: "link", label: "x", url: "https://a/{nope}" }] } },
      ]),
    ).toEqual(["auth[0].ui.actions[0].url has unknown placeholders: {nope}"]);
    expect(
      withAuth([{ type: "bearer", env: "T", ui: { actions: [{ type: "link", label: "x", url: "http://a" }] } }]),
    ).toEqual(["auth[0].ui.actions[0].url must be an https:// URL"]);
    expect(
      withAuth([
        {
          type: "bearer",
          env: "T",
          ui: { actions: [{ type: "cli", label: "x", command: "/tmp/x", args: ["{token}"] }] },
        },
      ]),
    ).toEqual([
      "auth[0].ui.actions[0].command must be a program name found on PATH, without a path or arguments",
      "auth[0].ui.actions[0].args has unknown placeholders: {token}",
    ]);
    expect(withAuth([{ type: "bearer", env: "T", ui: { texts: {} } }])).toEqual([
      "auth[0].ui.texts is not allowed here, use it on the manifest",
    ]);
    expect(withAuth([{ type: "none", ui: {} }])).toEqual([
      "auth[0].ui is only allowed for auth types: bearer, header, query, basic",
    ]);
  });

  it("needs a manifest domain for links that use it, and one credential for a CLI", () => {
    const link = { type: "link", label: "x", url: "https://{domain}/t" };

    expect(
      validateManifest({ ...demoManifest, auth: [{ type: "bearer", env: "T", ui: { actions: [link] } }] }),
    ).toEqual(["auth[0].ui.actions[0].url uses the domain, so the manifest needs a domain"]);
    expect(
      withAuth([
        {
          type: "basic",
          usernameEnv: "U",
          passwordEnv: "P",
          ui: { actions: [githubCli] },
        },
      ]),
    ).toEqual([expect.stringContaining("needs an auth entry with a single credential")]);
  });
});
