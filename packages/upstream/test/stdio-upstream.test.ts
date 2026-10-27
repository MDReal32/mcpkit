import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import type { UpstreamConnection } from "../src/main";
import { connectUpstream, UpstreamError } from "../src/main";

const FAKE_SERVER = fileURLToPath(new URL("./fixtures/fake-mcp-server.mjs", import.meta.url));
const open: UpstreamConnection[] = [];

const connect = async (command: string, args: string[], env?: Record<string, string>) => {
  const connection = await connectUpstream({ type: "stdio", command, args }, { env });
  open.push(connection);
  return connection;
};

afterEach(async () => {
  await Promise.all(open.splice(0).map((connection) => connection.close()));
});

describe("stdio upstream", () => {
  it("lists the tools of every page", async () => {
    const connection = await connect("node", [FAKE_SERVER]);

    const tools = await connection.listTools();

    expect(tools.map((tool) => tool.name)).toEqual(["echo", "whoami"]);
  });

  it("calls a tool with its arguments", async () => {
    const connection = await connect("node", [FAKE_SERVER]);

    const result = await connection.callTool("echo", { text: "hi" });

    expect(result.content).toEqual([{ type: "text", text: "hi" }]);
  });

  it("hands the child only the environment it was given", async () => {
    const connection = await connect("node", [FAKE_SERVER], { TOKEN: "secret-1" });

    const result = await connection.callTool("whoami");

    expect(result.content).toEqual([{ type: "text", text: "secret-1" }]);
  });

  it("fails with the reason when the command cannot start", async () => {
    await expect(connectUpstream({ type: "stdio", command: "mcpkit-no-such-program" })).rejects.toBeInstanceOf(
      UpstreamError,
    );
  });
});
