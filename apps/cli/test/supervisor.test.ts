import { existsSync } from "node:fs";
import { rename, utimes, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { PassThrough } from "node:stream";
import { useTempDir } from "@usemcpkit/testing";
import { describe, expect, it, vi } from "vitest";
import { superviseServe } from "../src/mcp";
import { watchBinaryFile } from "../src/mcp/supervisor/watch-binary-file";

const FAKE_WORKER = `
const fs = require('node:fs');
const path = require('node:path');
const dir = process.env.FAKE_DIR;
if (fs.existsSync(path.join(dir, 'broken'))) { process.exit(1); }
if (fs.existsSync(path.join(dir, 'stuck'))) { setInterval(() => undefined, 1000); }
const version = fs.readFileSync(path.join(dir, 'version.txt'), 'utf8').trim();
require('node:readline').createInterface({ input: process.stdin }).on('line', (line) => {
  const message = JSON.parse(line);
  if (message.method === 'initialize') {
    console.log(JSON.stringify({ jsonrpc: '2.0', id: message.id, result: { serverInfo: { version } } }));
  } else if (message.method === 'tools/list') {
    console.log(JSON.stringify({ jsonrpc: '2.0', id: message.id, result: { tools: [{ name: 'tool_' + version }] } }));
  }
});
`;

const rpc = (message: object) => `${JSON.stringify({ jsonrpc: "2.0", ...message })}\n`;

const createHarness = async (directory: string) => {
  await writeFile(join(directory, "worker.cjs"), FAKE_WORKER);
  await writeFile(join(directory, "version.txt"), "1.0.0");
  process.env.FAKE_DIR = directory;
  const input = new PassThrough();
  const output = new PassThrough();
  const received: Record<string, unknown>[] = [];
  output.on("data", (chunk: Buffer) => {
    for (const line of chunk.toString().split("\n").filter(Boolean)) {
      received.push(JSON.parse(line));
    }
  });
  const supervisor = await superviseServe(
    { command: process.execPath, args: [join(directory, "worker.cjs")] },
    { input, output },
  );
  const waitFor = async (predicate: (messages: readonly Record<string, unknown>[]) => boolean) =>
    vi.waitFor(() => expect(predicate(received)).toBe(true), { timeout: 10_000 });
  return { input, received, supervisor, waitFor };
};

describe("superviseServe", () => {
  const directory = useTempDir("mcpkit-supervisor-");

  it("swaps in the new binary, replays the handshake and announces the changed tools", async () => {
    const { input, received, supervisor, waitFor } = await createHarness(directory());
    input.write(rpc({ id: 1, method: "initialize", params: {} }));
    input.write(rpc({ method: "notifications/initialized" }));
    input.write(rpc({ id: 2, method: "tools/list" }));
    await waitFor((messages) => messages.some((message) => message.id === 2));

    await writeFile(join(directory(), "version.txt"), "2.0.0");
    await supervisor.reload();
    input.write(rpc({ id: 3, method: "tools/list" }));
    await waitFor((messages) => messages.some((message) => message.id === 3));
    input.end();

    expect(await supervisor.done).toBe(0);
    expect(received.find((message) => message.id === 2)).toMatchObject({ result: { tools: [{ name: "tool_1.0.0" }] } });
    expect(received.find((message) => message.id === 3)).toMatchObject({ result: { tools: [{ name: "tool_2.0.0" }] } });
    expect(received.filter((message) => message.method === "notifications/tools/list_changed")).toHaveLength(1);
    expect(received.filter((message) => message.id === "mcpkit-reload")).toEqual([]);
    expect(received.filter((message) => message.id === 1)).toHaveLength(1);
  });

  it("keeps the running server when the new one cannot start", async () => {
    const { input, received, supervisor, waitFor } = await createHarness(directory());
    input.write(rpc({ id: 1, method: "initialize", params: {} }));
    await waitFor((messages) => messages.some((message) => message.id === 1));

    await writeFile(join(directory(), "broken"), "");
    await supervisor.reload();
    expect(existsSync(join(directory(), "broken"))).toBe(true);
    input.write(rpc({ id: 2, method: "tools/list" }));
    await waitFor((messages) => messages.some((message) => message.id === 2));
    input.end();

    expect(await supervisor.done).toBe(0);
    expect(received.find((message) => message.id === 2)).toMatchObject({ result: { tools: [{ name: "tool_1.0.0" }] } });
    expect(received.some((message) => message.method === "notifications/tools/list_changed")).toBe(false);
  });

  it("ends a worker that keeps running after the client closed its input", async () => {
    await writeFile(join(directory(), "stuck"), "");
    const { input, supervisor, waitFor } = await createHarness(directory());
    input.write(rpc({ id: 1, method: "initialize", params: {} }));
    await waitFor((messages) => messages.some((message) => message.id === 1));

    input.end();

    expect(await supervisor.done).not.toBe(0);
  }, 15_000);

  it("stops on request while the client keeps its input open", async () => {
    const { input, supervisor, waitFor } = await createHarness(directory());
    input.write(rpc({ id: 1, method: "initialize", params: {} }));
    await waitFor((messages) => messages.some((message) => message.id === 1));

    supervisor.stop();

    expect(await supervisor.done).toBe(0);
  });
});

describe("watchBinaryFile", () => {
  const directory = useTempDir("mcpkit-watch-");

  it("reports a replaced file once, after it stayed the same for two polls", async () => {
    const path = join(directory(), "mcpkit");
    await writeFile(path, "one");
    const onChange = vi.fn();
    const stop = await watchBinaryFile(path, onChange, 10);

    const replacement = `${path}.next`;
    await writeFile(replacement, "version two");
    await utimes(replacement, new Date(), new Date(Date.now() + 5000));
    await rename(replacement, path);
    await vi.waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
    await new Promise((resolve) => setTimeout(resolve, 80));
    stop();

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
