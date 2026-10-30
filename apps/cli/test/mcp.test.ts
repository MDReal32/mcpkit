import { PassThrough } from "node:stream";
import { createFakeFetch, createPingManifest } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { Catalog } from "../src/mcp";
import { createRpcHandler, serveStdio } from "../src/mcp";

const manifest = createPingManifest("1.0.0", "", "demo");
const groupedTools = ["a", "b"].flatMap((group) => manifest.tools.map((tool) => ({ ...tool, name: `${group}:x:run` })));

const createCatalog = () => {
  const loaded: string[] = [];
  const catalog: Catalog = {
    servers: [
      { id: "test:demo", description: "Demo" },
      { id: "test:grouped", description: "Grouped" },
    ],
    loadManifest: async (id) => {
      loaded.push(id);
      return manifest;
    },
    loadGroups: async (id) => {
      loaded.push(`${id}/groups`);
      return id === "test:grouped" ? ["a", "b"] : [];
    },
    loadGroupManifest: async (id, group) => {
      loaded.push(`${id}/${group ?? ""}`);
      return id === "test:grouped"
        ? { ...manifest, name: "grouped", tools: groupedTools.filter((tool) => tool.name.startsWith(`${group}:`)) }
        : manifest;
    },
  };
  return { catalog, loaded };
};

const call = (name: string, args?: unknown) => ({ method: "tools/call", params: { name, arguments: args } });

const listNames = async (handle: ReturnType<typeof createRpcHandler>) => {
  const response = await handle({ id: 100, method: "tools/list" });
  const { tools } = (response?.result ?? { tools: [] }) as { tools: { name: string }[] };
  return tools.map((tool) => tool.name);
};

describe("createRpcHandler", () => {
  it("answers initialize with the client protocol version", async () => {
    const handle = createRpcHandler(createCatalog().catalog);

    const response = await handle({ id: 1, method: "initialize", params: { protocolVersion: "2025-03-26" } });

    expect(response?.result).toMatchObject({
      protocolVersion: "2025-03-26",
      capabilities: { tools: { listChanged: true } },
    });
  });

  it("lists one section per server, marked as not a tool, without loading anything", async () => {
    const { catalog, loaded } = createCatalog();

    const response = await createRpcHandler(catalog)({ id: 2, method: "tools/list" });

    expect(response?.result).toEqual({
      tools: [
        {
          name: "test_demo",
          description: expect.stringContaining("SECTION of mcpkit, not a callable tool"),
          inputSchema: { type: "object", properties: {} },
          annotations: { readOnlyHint: true },
        },
        {
          name: "test_grouped",
          description: expect.stringContaining("SECTION of mcpkit, not a callable tool"),
          inputSchema: { type: "object", properties: {} },
          annotations: { readOnlyHint: true },
        },
      ],
    });
    expect(loaded).toEqual([]);
  });

  it("opens a server that is not split and puts its tools in the list", async () => {
    const { catalog, loaded } = createCatalog();
    let changes = 0;
    const handle = createRpcHandler(catalog, { onToolsChanged: () => (changes += 1) });

    const opened = await handle({ id: 3, ...call("test_demo") });
    await handle({ id: 4, ...call("test_demo") });

    expect(JSON.stringify(opened?.result)).toContain("test_demo_ping_run");
    expect(await listNames(handle)).toEqual(["test_demo", "test_demo_ping_run", "test_grouped"]);
    expect(changes).toBe(1);
    expect(loaded).toEqual(["test:demo/groups", "test:demo/"]);
  });

  it("opens a split server group by group, loading only the group that is opened", async () => {
    const { catalog, loaded } = createCatalog();
    const handle = createRpcHandler(catalog);

    await handle({ id: 5, ...call("test_grouped") });
    expect(await listNames(handle)).toEqual(["test_demo", "test_grouped", "test_grouped_a", "test_grouped_b"]);
    await handle({ id: 6, ...call("test_grouped_b") });

    expect(await listNames(handle)).toEqual([
      "test_demo",
      "test_grouped",
      "test_grouped_a",
      "test_grouped_b",
      "test_grouped_b_x_run",
    ]);
    expect(loaded).toEqual(["test:grouped/groups", "test:grouped/b"]);
  });

  it("opens an upstream whose tools are named group:resource:action by group, and a flat one at once", async () => {
    const upstreamTool = (name: string) => [name, { name, upstreamName: name, description: name }] as const;
    const upstream = (names: string[]) => ({
      tools: new Map(names.map(upstreamTool)),
      call: async () => ({ content: [] }),
      close: async () => undefined,
    });
    const { catalog } = createCatalog();
    const grouped: Catalog = {
      ...catalog,
      servers: [
        { id: "test:up", upstream: true },
        { id: "test:flat", upstream: true },
      ],
      loadUpstream: async (id) => (id === "test:up" ? upstream(["a:x:run", "b:x:run"]) : upstream(["tools:ping"])),
    };
    const handle = createRpcHandler(grouped);

    await handle({ id: 20, ...call("test_up") });
    await handle({ id: 21, ...call("test_flat") });
    await handle({ id: 22, ...call("test_up_a") });

    expect(await listNames(handle)).toEqual([
      "test_up",
      "test_up_a",
      "test_up_a_x_run",
      "test_up_b",
      "test_flat",
      "test_flat_tools_ping",
    ]);
  });

  it("calls a tool by its name once its section is open and returns JSON text content", async () => {
    const handle = createRpcHandler(createCatalog().catalog, { fetchImpl: createFakeFetch(200, { pong: true }) });
    await handle({ id: 7, ...call("test_demo") });

    const response = await handle({ id: 8, ...call("test_demo_ping_run", {}) });

    expect(response?.result).toEqual({ content: [{ type: "text", text: '{\n  "pong": true\n}' }] });
  });

  it("reports tool failures as isError results", async () => {
    const failing = createRpcHandler(createCatalog().catalog, { fetchImpl: createFakeFetch(500, "boom") });
    await failing({ id: 9, ...call("test_demo") });

    const response = await failing({ id: 10, ...call("test_demo_ping_run") });

    expect(response?.result).toEqual({ content: [{ type: "text", text: "demo API 500: boom" }], isError: true });
  });

  it("reports a section that cannot be opened as an isError result and keeps it closed", async () => {
    const { catalog } = createCatalog();
    const broken: Catalog = {
      ...catalog,
      loadGroups: async () => {
        throw new Error("offline");
      },
    };
    const handle = createRpcHandler(broken);

    const response = await handle({ id: 11, ...call("test_grouped") });

    expect(response?.result).toEqual({
      content: [{ type: "text", text: "could not open test_grouped: offline" }],
      isError: true,
    });
    expect(await listNames(handle)).toEqual(["test_demo", "test_grouped"]);
  });

  it("returns protocol errors for unknown or still closed tools, bad arguments and unknown methods", async () => {
    const handle = createRpcHandler(createCatalog().catalog);

    expect((await handle({ id: 12, ...call("nope") }))?.error?.code).toBe(-32602);
    expect((await handle({ id: 13, ...call("test_demo_ping_run") }))?.error?.code).toBe(-32602);
    await handle({ id: 14, ...call("test_demo") });
    expect((await handle({ id: 15, ...call("test_demo_ping_run", []) }))?.error?.code).toBe(-32602);
    expect((await handle({ id: 16, method: "nope" }))?.error?.code).toBe(-32601);
  });

  it("returns nothing for notifications", async () => {
    expect(await createRpcHandler(createCatalog().catalog)({ method: "notifications/initialized" })).toBeNull();
  });
});

describe("serveStdio", () => {
  const collect = async (lines: string) => {
    const input = new PassThrough();
    const output = new PassThrough();
    const chunks: string[] = [];
    output.on("data", (chunk: Buffer) => chunks.push(chunk.toString()));

    const serving = serveStdio(createCatalog().catalog, { input, output });
    input.end(lines);
    await serving;
    await new Promise((resolve) => setTimeout(resolve, 10));

    return chunks
      .join("")
      .trim()
      .split("\n")
      .map((line): unknown => JSON.parse(line));
  };

  it("answers parse and invalid request errors with a null id", async () => {
    expect(await collect('garbage\n{"id":1}\n')).toEqual([
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: expect.stringMatching(/^parse error/) } },
      { jsonrpc: "2.0", id: null, error: { code: -32600, message: expect.stringMatching(/^invalid request/) } },
    ]);
  });

  it("answers the requests in flight once input closed, then closes the catalog", async () => {
    const input = new PassThrough();
    const output = new PassThrough();
    const events: string[] = [];
    output.on("data", (chunk: Buffer) => {
      if (chunk.toString().includes('"id":1')) {
        events.push("answered");
      }
    });
    const { catalog } = createCatalog();
    const slow: Catalog = {
      ...catalog,
      loadGroups: async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return [];
      },
      close: async () => {
        events.push("closed");
      },
    };

    const serving = serveStdio(slow, { input, output });
    input.end(`${JSON.stringify({ jsonrpc: "2.0", id: 1, ...call("test_demo") })}\n`);
    await serving;

    expect(events).toEqual(["answered", "closed"]);
  });

  it("announces tools/list_changed after the response that opened a section", async () => {
    const lines = `${JSON.stringify({ jsonrpc: "2.0", id: 1, ...call("test_demo") })}\n`;

    const messages = await collect(lines);

    expect(messages).toEqual([
      { jsonrpc: "2.0", id: 1, result: expect.anything() },
      { jsonrpc: "2.0", method: "notifications/tools/list_changed" },
    ]);
  });
});
