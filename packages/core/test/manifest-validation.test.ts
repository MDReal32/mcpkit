import { createPingManifest } from "@usemcpkit/testing";
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

  it("rejects a body argument that is undeclared or combined with body", () => {
    const manifest = {
      ...demoManifest,
      tools: [
        { ...createItemTool, request: { method: "POST", path: "/x", bodyArg: "ghost" } },
        {
          ...createItemTool,
          name: "second",
          request: { method: "POST", path: "/x", bodyArg: "title", body: ["title"] },
        },
      ],
    };

    expect(validateManifest(manifest)).toEqual([
      "tools[0] (create_item).request.bodyArg must name a declared arg",
      "tools[1] (second).request.bodyArg cannot be combined with body or fixedBody",
    ]);
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

describe("upstream manifests", () => {
  const base = { ...createPingManifest("1.0.0"), tools: [] };

  it("accepts an HTTP and a stdio upstream with no tools", () => {
    expect(validateManifest({ ...base, upstream: { type: "http", url: "https://mcp.example.com/mcp" } })).toEqual([]);
    expect(
      validateManifest({ ...base, upstream: { type: "stdio", command: "npx", args: ["-y", "demo-mcp"] } }),
    ).toEqual([]);
  });

  it("rejects tools next to an upstream, a path as command and a plain http url", () => {
    const manifest = createPingManifest("1.0.0");

    expect(validateManifest({ ...manifest, upstream: { type: "stdio", command: "/bin/sh" } })).toEqual([
      "upstream.command must be a program name on PATH, not a path",
      "tools must be empty when the manifest has an upstream",
    ]);
    expect(validateManifest({ ...base, upstream: { type: "http", url: "http://mcp.example.com" } })).toEqual([
      "upstream.url must be an https:// URL",
    ]);
  });
});
