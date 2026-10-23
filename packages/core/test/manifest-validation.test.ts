import { describe, expect, it } from "vitest";
import { validateManifest } from "../src/main";
import { createItemTool, demoManifest, listItemsTool } from "./fixtures/demo-manifest";

describe("validateManifest", () => {
  it("accepts a valid manifest", () => {
    expect(validateManifest(demoManifest)).toEqual([]);
  });

  it("reports structural problems", () => {
    const errors = validateManifest({ name: "Bad-Name", baseUrl: "http://x", auth: [{ type: "bearer" }], tools: [] });

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/^name must match/),
        expect.stringMatching(/^category must match/),
        "version is required",
        "baseUrl must be an https:// URL",
        'auth[0].env is required for auth type "bearer"',
        "tools must be a non-empty array",
      ]),
    );
  });

  it("rejects requests that reference undeclared args", () => {
    const invalid = {
      ...demoManifest,
      tools: [{ ...createItemTool, request: { method: "POST", path: "/x/{nope}", body: ["ghost"] } }],
    };

    expect(validateManifest(invalid)).toEqual([
      'tools[0] (create_item).request.path uses undeclared arg "nope"',
      'tools[0] (create_item).request.body uses undeclared arg "ghost"',
    ]);
  });

  it("rejects duplicate tool names", () => {
    expect(validateManifest({ ...demoManifest, tools: [listItemsTool, listItemsTool] })).toContain(
      "duplicate tool names: list_items",
    );
  });

  it("rejects non-object input", () => {
    expect(validateManifest(null)).toEqual(["manifest must be a JSON object"]);
  });
});
