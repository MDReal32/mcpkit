import type { Server } from "node:http";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { afterEach, describe, expect, it } from "vitest";
import { connectUpstream } from "../src/main";

interface SeenRequest {
  method: string;
  headers: Record<string, string | string[] | undefined>;
  body: string;
}

const servers: Server[] = [];
const seen: SeenRequest[] = [];

const startServer = async () => {
  const server = createServer((request, response) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      seen.push({ method: request.method ?? "", headers: request.headers, body });
      if (request.method === "DELETE") {
        response.writeHead(204).end();
        return;
      }
      const message = JSON.parse(body) as { id?: number; method: string; params?: { name?: string } };
      if (message.id === undefined) {
        response.writeHead(202).end();
        return;
      }
      if (message.method === "initialize") {
        response.writeHead(200, { "content-type": "application/json", "mcp-session-id": "session-1" });
        response.end(JSON.stringify({ jsonrpc: "2.0", id: message.id, result: { capabilities: {} } }));
        return;
      }
      const result =
        message.method === "tools/list"
          ? { tools: [{ name: "search", description: "Searches" }] }
          : { content: [{ type: "text", text: `ran ${message.params?.name}` }] };
      response.writeHead(200, { "content-type": "text/event-stream" });
      response.end(`event: message\ndata: ${JSON.stringify({ jsonrpc: "2.0", id: message.id, result })}\n\n`);
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  servers.push(server);
  return `http://127.0.0.1:${(server.address() as AddressInfo).port}/mcp`;
};

afterEach(async () => {
  seen.length = 0;
  await Promise.all(servers.splice(0).map((server) => new Promise((resolve) => server.close(resolve))));
});

describe("http upstream", () => {
  it("keeps the session, signs requests and reads event-stream replies", async () => {
    const url = await startServer();
    const connection = await connectUpstream(
      { type: "http", url },
      { headers: { Authorization: "Bearer t-1" }, fetchImpl: fetch },
    );

    const tools = await connection.listTools();
    const result = await connection.callTool("search", { q: "x" });
    await connection.close();

    expect(tools.map((tool) => tool.name)).toEqual(["search"]);
    expect(result.content).toEqual([{ type: "text", text: "ran search" }]);
    const listing = seen.find((request) => request.body.includes("tools/list"));
    expect(listing?.headers["mcp-session-id"]).toBe("session-1");
    expect(listing?.headers.authorization).toBe("Bearer t-1");
    expect(seen.at(-1)?.method).toBe("DELETE");
  });
});
