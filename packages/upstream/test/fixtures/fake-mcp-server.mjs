import { createInterface } from "node:readline";

const TOOLS = [
  {
    name: "echo",
    description: "Echoes text",
    inputSchema: { type: "object", properties: { text: { type: "string" } } },
  },
  { name: "whoami", description: "Reads TOKEN from the environment", inputSchema: { type: "object" } },
];

const reply = (id, result) => process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id, result })}\n`);

createInterface({ input: process.stdin }).on("line", (line) => {
  const { id, method, params } = JSON.parse(line);
  if (method === "initialize") {
    reply(id, {
      protocolVersion: params.protocolVersion,
      capabilities: { tools: {} },
      serverInfo: { name: "fake", version: "1" },
    });
  } else if (method === "tools/list") {
    const second = params?.cursor === "page-2";
    reply(id, second ? { tools: [TOOLS[1]] } : { tools: [TOOLS[0]], nextCursor: "page-2" });
  } else if (method === "tools/call") {
    const text = params.name === "whoami" ? String(process.env.TOKEN) : String(params.arguments.text);
    reply(id, { content: [{ type: "text", text }] });
  }
});
