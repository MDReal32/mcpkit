import { describe, expect, it } from "vitest";
import { fillTemplate, resolveLinkUrl } from "../src/main";

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
