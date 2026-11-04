import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { useTempDir } from "@usemcpkit/testing";
import { it } from "vitest";
import { createRpcHandler } from "../src/mcp";
import { handleLine } from "../src/mcp/rpc/handle-line";
import { createBuiltRegistryCatalog } from "./fixtures/create-built-registry-catalog";
import { toCanonicalJson } from "./fixtures/to-canonical-json";

const OUTPUT_DIR = process.env.SESSION_GOLDEN_OUTPUT ?? "";

const SECTION_MARKER = "SECTION of usemcpkit";

const call = (id: number, name: string, args?: unknown) =>
  JSON.stringify({ jsonrpc: "2.0", id, method: "tools/call", params: { name, arguments: args } });

const list = (id: number) => JSON.stringify({ jsonrpc: "2.0", id, method: "tools/list" });

/** A client session over the servers whose tools exercise each generator: every line is answered on its own. */
const SESSION_LINES = [
  JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "parity", version: "1" } },
  }),
  JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }),
  JSON.stringify({ jsonrpc: "2.0", id: 2, method: "ping" }),
  list(3),
  "{",
  "",
  JSON.stringify({ jsonrpc: "2.0", id: 4, method: "resources/list" }),
  call(5, "nope_missing"),
  JSON.stringify({ jsonrpc: "2.0", id: 6, method: "tools/call", params: {} }),
  call(7, "communication_medium"),
  call(8, "communication_medium"),
  call(9, "communication_medium_account"),
  call(10, "communication_medium_images"),
  call(11, "communication_medium_posts"),
  call(12, "communication_medium_publications"),
  call(13, "communication_reddit"),
  call(14, "communication_reddit_posts"),
  call(15, "communication_reddit_subreddits"),
  call(16, "productivity_clickup"),
  call(17, "productivity_clickup_goals"),
  call(18, "productivity_clickup_docs"),
  call(19, "atlassian_jira"),
  call(20, "atlassian_jira_administration"),
  call(21, "git_github"),
  call(22, "git_github_meta"),
  list(23),
];

const tempDir = useTempDir("usemcpkit-session-golden-");

interface ListedTool {
  name: string;
  description?: string;
}

interface ToolList {
  tools: ListedTool[];
}

/**
 * Writes `apps/server/tests/fixtures/session.json` (each line of `SESSION_LINES` with the response and whether the
 * tool list changed) and `tool-digests.json` (a sha256 of each tool as `tools/list` sends it, after every section of
 * every server that is not an upstream was opened), which the Rust server's session test replays.
 */
it.skipIf(OUTPUT_DIR === "")("writes the session and tool digest golden files", async () => {
  const catalog = await createBuiltRegistryCatalog(tempDir());
  let changes = 0;
  const handler = createRpcHandler(catalog, { onToolsChanged: () => (changes += 1) });
  const session = [];
  for (const line of SESSION_LINES) {
    changes = 0;
    const response = await handleLine(line, handler);
    session.push({ line, response, toolsChanged: changes > 0 });
  }
  writeFileSync(join(OUTPUT_DIR, "session.json"), `${JSON.stringify(session, null, 1)}\n`);

  const upstreamSections = new Set(
    catalog.servers.filter((server) => server.upstream).map((server) => server.id.replace(":", "_")),
  );
  const opener = createRpcHandler(catalog);
  const opened = new Set<string>();
  const listTools = async () => {
    const response = await opener({ id: 1, method: "tools/list" });
    if (!response) {
      throw new Error("tools/list gave no response");
    }
    return (response.result as ToolList).tools;
  };
  const findClosedSections = (tools: ListedTool[]) =>
    tools.filter(
      (tool) =>
        tool.description?.includes(SECTION_MARKER) && !opened.has(tool.name) && !upstreamSections.has(tool.name),
    );
  let tools = await listTools();
  let closed = findClosedSections(tools);
  while (closed.length > 0) {
    for (const section of closed) {
      opened.add(section.name);
      await opener({ id: 1, method: "tools/call", params: { name: section.name } });
    }
    tools = await listTools();
    closed = findClosedSections(tools);
  }
  const digests = Object.fromEntries(
    tools.map((tool) => [tool.name, createHash("sha256").update(toCanonicalJson(tool)).digest("hex")]),
  );
  writeFileSync(join(OUTPUT_DIR, "tool-digests.json"), `${JSON.stringify(digests, null, 1)}\n`);
});
