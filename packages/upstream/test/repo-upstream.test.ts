import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { UpstreamRepo } from "@usemcpkit/core";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { UpstreamConnection } from "../src/main";
import { connectUpstream, UpstreamError } from "../src/main";

const FAKE_SERVER = fileURLToPath(new URL("./fixtures/fake-mcp-server.mjs", import.meta.url));
const WRITE_STAMP = "require('fs').writeFileSync('stamp.txt', String(Math.random()))";

const git = (cwd: string, ...args: string[]) =>
  execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", "-c", "commit.gpgsign=false", ...args], {
    cwd,
    encoding: "utf8",
  }).trim();

let root = "";
let source = "";
let commit = "";
const open: UpstreamConnection[] = [];

const connect = async (repo: UpstreamRepo, repoDir = join(root, "repos", "demo")) => {
  const connection = await connectUpstream(
    { type: "stdio", command: "node", args: ["{repo}/fake-mcp-server.mjs"], repo },
    { repoDir },
  );
  open.push(connection);
  return connection;
};

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "mcpkit-repo-"));
  source = join(root, "source");
  execFileSync("git", ["init", "--quiet", source]);
  copyFileSync(FAKE_SERVER, join(source, "fake-mcp-server.mjs"));
  git(source, "add", ".");
  git(source, "commit", "--quiet", "-m", "init");
  commit = git(source, "rev-parse", "HEAD");
});

afterEach(async () => {
  await Promise.all(open.splice(0).map((connection) => connection.close()));
  rmSync(root, { recursive: true, force: true });
});

describe("stdio upstream run from a repository", () => {
  it("clones at the pinned commit, runs setup once and starts the program from the clone", async () => {
    const repo: UpstreamRepo = { url: source, ref: commit, setup: [{ command: "node", args: ["-e", WRITE_STAMP] }] };

    const first = await connect(repo);
    const stamp = readFileSync(join(root, "repos", "demo", "stamp.txt"), "utf8");
    await first.close();
    const second = await connect(repo);

    expect((await second.callTool("echo", { text: "hi" })).content).toEqual([{ type: "text", text: "hi" }]);
    expect(readFileSync(join(root, "repos", "demo", "stamp.txt"), "utf8")).toBe(stamp);
  });

  it("hands setup no credentials, only the server", async () => {
    const repo: UpstreamRepo = {
      url: source,
      ref: commit,
      setup: [
        { command: "node", args: ["-e", "require('fs').writeFileSync('seen.txt', process.env.TOKEN ?? 'none')"] },
      ],
    };
    const connection = await connectUpstream(
      { type: "stdio", command: "node", args: ["{repo}/fake-mcp-server.mjs"], repo },
      { repoDir: join(root, "repos", "demo"), env: { TOKEN: "secret-1" } },
    );
    open.push(connection);

    expect(readFileSync(join(root, "repos", "demo", "seen.txt"), "utf8")).toBe("none");
    expect((await connection.callTool("whoami")).content).toEqual([{ type: "text", text: "secret-1" }]);
  });

  it("leaves no clone behind when setup fails", async () => {
    const repo: UpstreamRepo = {
      url: source,
      ref: commit,
      setup: [{ command: "node", args: ["-e", "process.exit(3)"] }],
    };

    await expect(connect(repo)).rejects.toBeInstanceOf(UpstreamError);

    expect(existsSync(join(root, "repos", "demo"))).toBe(false);
  });

  it("needs a folder to clone into", async () => {
    await expect(
      connectUpstream({ type: "stdio", command: "node", repo: { url: source, ref: commit } }),
    ).rejects.toThrow(/no folder was given/);
  });
});
