import { strict as assert } from "node:assert";
import { rm } from "node:fs/promises";
import {
  OPENED_GROUP_TOOL,
  PROTOCOL_VERSION,
  RESPONSE_TIMEOUT_MS,
  SECTION_TEXT_PREFIX,
  SECTION_TOOL,
  SERVER_NAME,
  TOOLS_CHANGED_METHOD,
  UNREACHABLE_REGISTRY,
} from "./const.ts";
import { readIndexedServerCount } from "./read-indexed-server-count.ts";
import { seedHome } from "./seed-home.ts";
import { startStdioSession } from "./start-stdio-session.ts";
import type { CallToolResult } from "./types/call-tool-result.ts";
import type { InitializeResult } from "./types/initialize-result.ts";
import type { StdioSession } from "./types/stdio-session.ts";
import type { ToolsListResult } from "./types/tools-list-result.ts";

const talkToServer = async (session: StdioSession, serverCount: number) => {
  session.send({ jsonrpc: "2.0", id: 0, method: "initialize", params: { protocolVersion: PROTOCOL_VERSION } });
  const initialized = await session.receive<InitializeResult>();
  assert.equal(initialized.result?.protocolVersion, PROTOCOL_VERSION);
  assert.equal(initialized.result?.serverInfo.name, SERVER_NAME);
  session.send({ jsonrpc: "2.0", method: "notifications/initialized" });

  session.send({ jsonrpc: "2.0", id: 1, method: "tools/list" });
  const listed = await session.receive<ToolsListResult>();
  assert.equal(listed.result?.tools.length, serverCount, "tools/list lists one section per indexed server");

  session.send({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: SECTION_TOOL } });
  const opened = await session.receive<CallToolResult>();
  assert.equal(opened.id, 2);
  assert.equal(opened.result?.isError, undefined);
  const text = opened.result?.content[0]?.text ?? "";
  assert.ok(text.startsWith(SECTION_TEXT_PREFIX), text);
  const notice = await session.receive();
  assert.equal(notice.method, TOOLS_CHANGED_METHOD);

  session.send({ jsonrpc: "2.0", id: 3, method: "tools/list" });
  const relisted = await session.receive<ToolsListResult>();
  const names = relisted.result?.tools.map((tool) => tool.name) ?? [];
  assert.ok(names.includes(OPENED_GROUP_TOOL), `${OPENED_GROUP_TOOL} missing from ${names.join(", ")}`);
};

/**
 * Runs `usemcpkit serve` from `runner` (which starts the `usemcpkit-servers` next to it) against a home seeded from
 * `registryDir`: initialize, list the sections, open `git:github` and list again. Auto-update is off and the registry
 * unreachable, so nothing is installed, scheduled or fetched.
 */
export const runSmokeTest = async (runner: string, registryDir: string) => {
  const serverCount = await readIndexedServerCount(registryDir);
  const home = await seedHome(registryDir);
  const session = startStdioSession({
    command: runner,
    args: ["serve"],
    env: {
      ...process.env,
      USEMCPKIT_HOME: home,
      USEMCPKIT_REGISTRY: UNREACHABLE_REGISTRY,
      USEMCPKIT_AUTO_UPDATE: "0",
      USEMCPKIT_DEBUG: "0",
    },
    timeoutMs: RESPONSE_TIMEOUT_MS,
  });
  try {
    await talkToServer(session, serverCount);
    const code = await session.close();
    assert.equal(code, 0, "usemcpkit exits with 0 once stdin closes");
  } catch (error) {
    await session.kill();
    process.stderr.write(`usemcpkit stderr:\n${session.stderr()}\n`);
    throw error;
  } finally {
    await rm(home, { recursive: true, force: true });
  }
  return serverCount;
};
