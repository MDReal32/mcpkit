import { nameUpstreamTool } from "@usemcpkit/core";
import { describe, expect, it } from "vitest";
import { cloudflare } from "../src/servers/cloudflare/cloudflare";

const UPSTREAM_TOOLS = ["docs", "search", "execute", "whoami"];

const naming = cloudflare.upstream?.naming;

describe("cloudflare naming rules", () => {
  it("name every tool of the server as <group>:<resource>:<action>", () => {
    expect(UPSTREAM_TOOLS.map((tool) => nameUpstreamTool(naming, tool))).toEqual([
      "docs:docs:search",
      "api:spec:search",
      "api:requests:execute",
      "account:account:whoami",
    ]);
  });

  it("leaves a tool Cloudflare adds later to the default name", () => {
    expect(nameUpstreamTool(naming, "something_new")).toBeUndefined();
  });
});
