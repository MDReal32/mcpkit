import { describe, expect, it } from "vitest";
import { nameUpstreamTool } from "../src/main";

const rules = [
  { match: "^([a-z]+)_org_member$", name: "org:members:$1" },
  { match: "^(list|get)$", name: "vault:items:$&" },
  { match: "^broken$", name: "oops:$&" },
];

describe("nameUpstreamTool", () => {
  it("uses the first rule that matches, filling captures and the whole name", () => {
    expect(nameUpstreamTool(rules, "invite_org_member")).toBe("org:members:invite");
    expect(nameUpstreamTool(rules, "get")).toBe("vault:items:get");
  });

  it("returns undefined when no rule matches or there are none", () => {
    expect(nameUpstreamTool(rules, "other")).toBeUndefined();
    expect(nameUpstreamTool(undefined, "get")).toBeUndefined();
  });

  it("fails loudly when a rule produces a name that is not group:resource:action", () => {
    expect(() => nameUpstreamTool(rules, "broken")).toThrow(/not <group>:<resource>:<action>/);
  });
});
