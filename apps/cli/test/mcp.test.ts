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

const textOf = (result: unknown) => {
  const content = (result as { content: { text: string }[] }).content;
  return content[0]?.text ?? "";
};

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

  it("lists the four meta-tools whatever the registry holds", async () => {
    const response = await handle({ id: 2, method: "tools/list" });

    const result = response?.result as { tools: { name: string }[] } | undefined;
    expect(result?.tools.map((tool) => tool.name)).toEqual([
      "list_servers",
      "list_tools",
      "describe_tool",
      "call_tool",
    ]);
  });

  it("lists servers and tool ids from the catalog without loading a manifest", async () => {
    const servers = await handle({ id: 3, ...call("list_servers") });
    const tools = await handle({ id: 4, ...call("list_tools", { server: "test:demo" }) });

    expect(JSON.parse(textOf(servers?.result))).toEqual(["test:demo"]);
    expect(JSON.parse(textOf(tools?.result))).toEqual(["test:demo:ping:run"]);
    expect(loaded).toEqual([]);
  });

  it("describes a tool by loading its manifest", async () => {
    const response = await handle({ id: 5, ...call("describe_tool", { id: "test:demo:ping:run" }) });

    expect(JSON.parse(textOf(response?.result))).toEqual({
      id: "test:demo:ping:run",
      description: "Ping",
      inputSchema: { type: "object", properties: {} },
    });
    expect(loaded).toEqual(["test:demo"]);
  });

  it("calls a tool and returns JSON text content", async () => {
    const response = await handle({ id: 6, ...call("call_tool", { id: "test:demo:ping:run", arguments: {} }) });

    expect(response?.result).toEqual({ content: [{ type: "text", text: '{\n  "pong": true\n}' }] });
  });

  it("reports tool failures as isError results", async () => {
    const failing = createRpcHandler(createCatalog().catalog, { fetchImpl: createFakeFetch(500, "boom") });

    const response = await failing({ id: 7, ...call("call_tool", { id: "test:demo:ping:run" }) });

    expect(response?.result).toEqual({ content: [{ type: "text", text: "demo API 500: boom" }], isError: true });
  });

  it("reports unknown servers, tools and malformed ids as isError results", async () => {
    const ids = ["test:nope:ping:run", "test:demo:nope:run", "ping"];

    for (const id of ids) {
      const response = await handle({ id: 8, ...call("call_tool", { id }) });
      expect(response?.result).toMatchObject({ isError: true });
    }
  });

  it("returns protocol errors for unknown meta-tools, bad arguments and unknown methods", async () => {
    expect((await handle({ id: 9, ...call("nope") }))?.error?.code).toBe(-32602);
    expect((await handle({ id: 10, ...call("call_tool", []) }))?.error?.code).toBe(-32602);
    expect((await handle({ id: 11, ...call("call_tool", {}) }))?.error?.code).toBe(-32602);
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
