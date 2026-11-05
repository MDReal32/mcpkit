import { createPingManifest } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { Manifest } from "../src/main";
import { applyDomain } from "../src/main";

const createLocalManifest = (loopbackHttp: boolean) => {
  const manifest: Manifest = {
    ...createPingManifest("1.0.0"),
    baseUrl: "https://{domain}/api/v1",
    domain: { loopbackHttp },
  };
  return manifest;
};

describe("applyDomain", () => {
  it("reaches a loopback domain over http only when the manifest allows it", () => {
    expect(applyDomain(createLocalManifest(true), "localhost:5678").baseUrl).toBe("http://localhost:5678/api/v1");
    expect(applyDomain(createLocalManifest(false), "localhost:5678").baseUrl).toBe("https://localhost:5678/api/v1");
    expect(applyDomain(createLocalManifest(true), "acme.app.n8n.cloud").baseUrl).toBe(
      "https://acme.app.n8n.cloud/api/v1",
    );
  });
});
