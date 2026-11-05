import { describe, expect, it } from "vitest";
import { fillTemplate, resolveLinkUrl } from "../src/main";

describe("fillTemplate", () => {
  it("fills known placeholders and leaves the others", () => {
    expect(fillTemplate("{a} and {b}", { a: "x" })).toBe("x and {b}");
  });
});

describe("resolveLinkUrl", () => {
  it("uses the domain as typed, or its web host", () => {
    expect(resolveLinkUrl("https://{domain}/-/tokens", "git.acme.com/gitlab", false)).toBe(
      "https://git.acme.com/gitlab/-/tokens",
    );
    expect(resolveLinkUrl("https://{webHost}/t", "api.github.com", false)).toBe("https://github.com/t");
    expect(resolveLinkUrl("https://{webHost}/t", "api.acme.ghe.com", false)).toBe("https://acme.ghe.com/t");
    expect(resolveLinkUrl("https://{webHost}/t", "ghe.example.com/api/v3", false)).toBe("https://ghe.example.com/t");
  });

  it("waits for a domain only when the link needs one", () => {
    expect(resolveLinkUrl("https://{domain}/t", undefined, false)).toBeUndefined();
    expect(resolveLinkUrl("https://id.example.com/t", undefined, false)).toBe("https://id.example.com/t");
  });
});

describe("resolveLinkUrl on a loopback domain", () => {
  it("opens the link over http only when the server allows it", () => {
    expect(resolveLinkUrl("https://{domain}/settings/api", "localhost:5678", true)).toBe(
      "http://localhost:5678/settings/api",
    );
    expect(resolveLinkUrl("https://{domain}/settings/api", "localhost:5678", false)).toBe(
      "https://localhost:5678/settings/api",
    );
    expect(resolveLinkUrl("https://docs.n8n.io/api/", "localhost:5678", true)).toBe("https://docs.n8n.io/api/");
    expect(resolveLinkUrl("https://{domain}/settings/api", "acme.app.n8n.cloud", true)).toBe(
      "https://acme.app.n8n.cloud/settings/api",
    );
  });
});
