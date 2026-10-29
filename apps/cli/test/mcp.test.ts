import { PassThrough } from "node:stream";
import { createFakeFetch, createPingManifest } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { Catalog } from "../src/mcp";
import { createRpcHandler, serveStdio } from "../src/mcp";

const manifest = createPingManifest("1.0.0", "", "demo");

const createCatalog = () => {
  const loaded: string[] = [];
  const catalog: Catalog = {
    servers: [{ id: "test:demo", description: "Demo", tools: ["ping:run"] }],
    loadManifest: async (id) => {
      loaded.push(id);
      return manifest;
    },
  };
  return { catalog, loaded };
};

const call = (name: string, args?: unknown) => ({ method: "tools/call", params: { name, arguments: args } });

describe("createRpcHandler", () => {
  const { catalog, loaded } = createCatalog();
  const handle = createRpcHandler(catalog, { fetchImpl: createFakeFetch(200, { pong: true }) });

  it("answers initialize with the client protocol version", async () => {
    const response = await handle({ id: 1, method: "initialize", params: { protocolVersion: "2025-03-26" } });

    expect(response?.result).toMatchObject({
      protocolVersion: "2025-03-26",
      capabilities: { tools: { listChanged: true } },
    });
  });

  it("lists every tool as its own MCP tool with its schema", async () => {
    const response = await handle({ id: 2, method: "tools/list" });

    expect(response?.result).toEqual({
      tools: [
        {
          name: "test_demo_ping_run",
          description: "Ping",
          inputSchema: { type: "object", properties: {} },
        },
      ],
    });
    expect(loaded).toEqual(["test:demo"]);
  });

  it("calls a tool by its name and returns JSON text content", async () => {
    const response = await handle({ id: 3, ...call("test_demo_ping_run", {}) });

    expect(response?.result).toEqual({ content: [{ type: "text", text: '{\n  "pong": true\n}' }] });
  });

  it("reports tool failures as isError results", async () => {
    const failing = createRpcHandler(createCatalog().catalog, { fetchImpl: createFakeFetch(500, "boom") });

    const response = await failing({ id: 4, ...call("test_demo_ping_run") });

    expect(response?.result).toEqual({ content: [{ type: "text", text: "demo API 500: boom" }], isError: true });
  });

  it("leaves out a server whose tools cannot be loaded and warns", async () => {
    const warnings: string[] = [];
    const broken: Catalog = {
      servers: [{ id: "test:demo", tools: ["ping:run"] }],
      loadManifest: async () => {
        throw new Error("offline");
      },
    };

    const response = await createRpcHandler(broken, { onWarning: (message) => warnings.push(message) })({
      id: 5,
      method: "tools/list",
    });

    expect(response?.result).toEqual({ tools: [] });
    expect(warnings).toEqual(["test:demo: its tools are not listed: offline"]);
  });

  it("returns protocol errors for unknown tools, bad arguments and unknown methods", async () => {
    expect((await handle({ id: 9, ...call("nope") }))?.error?.code).toBe(-32602);
    expect((await handle({ id: 10, ...call("test_demo_ping_run", []) }))?.error?.code).toBe(-32602);
    expect((await handle({ id: 12, method: "nope" }))?.error?.code).toBe(-32601);
  });

  it("returns nothing for notifications", async () => {
    expect(await handle({ method: "notifications/initialized" })).toBeNull();
  });
});

describe("serveStdio", () => {
  it("answers parse and invalid request errors with a null id", async () => {
    const input = new PassThrough();
    const output = new PassThrough();
    const chunks: string[] = [];
    output.on("data", (chunk: Buffer) => chunks.push(chunk.toString()));

    const serving = serveStdio(createCatalog().catalog, { input, output });
    input.end('garbage\n{"id":1}\n');
    await serving;
    await new Promise((resolve) => setImmediate(resolve));

    const responses: unknown = chunks
      .join("")
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));
    expect(responses).toEqual([
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: expect.stringMatching(/^parse error/) } },
      { jsonrpc: "2.0", id: null, error: { code: -32600, message: expect.stringMatching(/^invalid request/) } },
    ]);
  });
});
