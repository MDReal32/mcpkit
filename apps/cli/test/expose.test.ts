import { createFakeFetch, createPingManifest } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { Catalog } from "../src/mcp";
import { createRpcHandler, listExposedTools } from "../src/mcp";

const manifest = createPingManifest("1.0.0", "", "demo");

const catalog: Catalog = {
  servers: [
    { id: "test:demo", tools: ["ping:run", "ping:stop"] },
    { id: "test:other", tools: ["ping:run", `ping:${"x".repeat(60)}`] },
  ],
  loadManifest: async () => manifest,
};

const textOf = (result: unknown) => (result as { content: { text: string }[] }).content[0]?.text ?? "";

describe("listExposedTools", () => {
  it("names a tool by its id without the category, matched by a prefix with or without it", () => {
    for (const pattern of ["test:demo:ping", "demo:ping:*", "demo", "test:demo:ping:run"]) {
      expect(listExposedTools(catalog, [pattern]).tools[0]).toEqual({
        name: "demo_ping_run",
        id: "test:demo:ping:run",
      });
    }
    expect(listExposedTools(catalog, ["demo:ping:run"]).tools).toHaveLength(1);
  });

  it("matches whole segments only", () => {
    expect(listExposedTools(catalog, ["dem"]).tools).toEqual([]);
  });

  it("skips a name that is too long", () => {
    const { tools, skipped } = listExposedTools(catalog, ["other"]);

    expect(tools.map((tool) => tool.name)).toEqual(["other_ping_run"]);
    expect(skipped).toHaveLength(1);
  });
});

describe("exposed tools over MCP", () => {
  const handle = createRpcHandler(catalog, {
    fetchImpl: createFakeFetch(200, { pong: true }),
    exposedTools: async () => ["demo:ping:run"],
  });

  it("lists them after the four meta-tools, with their schema", async () => {
    const response = await handle({ id: 1, method: "tools/list" });

    const result = response?.result as { tools: { name: string }[] } | undefined;
    const names = result?.tools.map((tool) => tool.name);
    expect(names).toEqual(["list_servers", "list_tools", "describe_tool", "call_tool", "demo_ping_run"]);
  });

  it("runs one by its own name", async () => {
    const response = await handle({ id: 2, method: "tools/call", params: { name: "demo_ping_run", arguments: {} } });

    expect(textOf(response?.result)).toContain("pong");
  });

  it("rejects a tool that is not exposed", async () => {
    const response = await handle({ id: 3, method: "tools/call", params: { name: "demo_ping_stop" } });

    expect(response?.error).toBeDefined();
  });
});
