import { strict as assert } from "node:assert";
import { rm } from "node:fs/promises";
import {
  EXECUTE_CODE,
  EXECUTE_RESULT,
  EXECUTE_TOOL,
  GITHUB_GROUP,
  GITHUB_GROUPS_CODE,
  LISTED_TOOLS,
  PROTOCOL_VERSION,
  RESPONSE_TIMEOUT_MS,
  SEARCH_TOOL,
  SERVER_COUNT_CODE,
  SERVER_NAME,
  UNREACHABLE_REGISTRY,
} from "./const.ts";
import { readIndexedServerCount } from "./read-indexed-server-count.ts";
import { seedHome } from "./seed-home.ts";
import { startStdioSession } from "./start-stdio-session.ts";
import type { CallToolResult } from "./types/call-tool-result.ts";
import type { InitializeResult } from "./types/initialize-result.ts";
import type { StdioSession } from "./types/stdio-session.ts";
import type { ToolsListResult } from "./types/tools-list-result.ts";

const runCode = async (session: StdioSession, id: number, name: string, code: string) => {
  session.send({ jsonrpc: "2.0", id, method: "tools/call", params: { name, arguments: { code } } });
  const answered = await session.receive<CallToolResult>();
  assert.equal(answered.id, id);
  const text = answered.result?.content[0]?.text ?? "";
  assert.equal(answered.result?.isError, undefined, text);
  return text;
};

const talkToServer = async (session: StdioSession, serverCount: number) => {
  session.send({ jsonrpc: "2.0", id: 0, method: "initialize", params: { protocolVersion: PROTOCOL_VERSION } });
  const initialized = await session.receive<InitializeResult>();
  assert.equal(initialized.result?.protocolVersion, PROTOCOL_VERSION);
  assert.equal(initialized.result?.serverInfo.name, SERVER_NAME);
  session.send({ jsonrpc: "2.0", method: "notifications/initialized" });

  session.send({ jsonrpc: "2.0", id: 1, method: "tools/list" });
  const listed = await session.receive<ToolsListResult>();
  assert.deepEqual(
    listed.result?.tools.map((tool) => tool.name),
    LISTED_TOOLS,
  );

  const servers = await runCode(session, 2, SEARCH_TOOL, SERVER_COUNT_CODE);
  assert.equal(servers, String(serverCount), "search sees every indexed server");
  const groups: string[] = JSON.parse(await runCode(session, 3, SEARCH_TOOL, GITHUB_GROUPS_CODE));
  assert.ok(groups.includes(GITHUB_GROUP), `${GITHUB_GROUP} missing from ${groups.join(", ")}`);
  assert.equal(await runCode(session, 4, EXECUTE_TOOL, EXECUTE_CODE), EXECUTE_RESULT);
};

/**
 * Runs `usemcpkit serve` from `runner` (which starts the `usemcpkit-servers` next to it) against a home seeded from
 * `registryDir`: initialize, list `search` and `execute`, search the servers and the groups of `git:github`, and run a
 * piece of code with `execute`. Auto-update is off and the registry unreachable, so nothing is installed, scheduled or
 * fetched.
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
      USEMCPKIT_AUTOUPDATE: "0",
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
