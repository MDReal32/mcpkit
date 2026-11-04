import { createPingManifest } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { AuthSpec, Manifest } from "../src/main";
import { validateManifest } from "../src/main";

const tokenAuth: readonly AuthSpec[] = [{ type: "bearer", env: "DEMO_TOKEN" }];

const createDomainManifest = (name: string, auth: readonly AuthSpec[] = tokenAuth) => {
  const manifest: Manifest = {
    ...createPingManifest("1.0.0", "", name, auth),
    baseUrl: "https://{domain}/api",
    domain: { label: "API host", default: "api.example.com", env: "DEMO_DOMAIN" },
  };
  return manifest;
};

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
