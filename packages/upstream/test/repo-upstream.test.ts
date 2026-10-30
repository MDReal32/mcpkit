import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { UpstreamRepo } from "@usemcpkit/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { UpstreamConnection } from "../src/main";
import { connectUpstream, UpstreamError } from "../src/main";
import { REPO_CHECK_INTERVAL_MS } from "../src/repo/const";
import { ensureRepo } from "../src/repo/ensure-repo";
import { readRepoState } from "../src/repo/read-repo-state";

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

describe("a clone kept up to date with its remote ref", () => {
  const dirOf = () => join(root, "repos", "demo");
  const commitFile = (name: string) => {
    writeFileSync(join(source, name), name);
    git(source, "add", ".");
    git(source, "commit", "--quiet", "-m", name);
    return git(source, "rev-parse", "HEAD");
  };
  const ensure = (repo: UpstreamRepo, warnings: string[] = [], check = true) =>
    ensureRepo(repo, dirOf(), { check, warn: (message) => warnings.push(message) });
  const later = (ms: number) => vi.setSystemTime(Date.now() + ms);

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("records the commit the ref resolved to and when the clone was built and checked", async () => {
    vi.setSystemTime(1_000);
    await ensure({ url: source, ref: "HEAD" });

    expect(await readRepoState(dirOf())).toMatchObject({ commit, updatedAt: 1_000, checkedAt: 1_000 });
  });

  it("uses the clone as it is until the last check is older than the interval, then rebuilds it when the ref moved", async () => {
    vi.setSystemTime(1_000);
    const repo: UpstreamRepo = { url: source, ref: "HEAD" };
    await ensure(repo);
    const moved = commitFile("moved.txt");

    later(REPO_CHECK_INTERVAL_MS - 1);
    await ensure(repo);
    expect(existsSync(join(dirOf(), "moved.txt"))).toBe(false);

    later(2);
    await ensure(repo);
    expect(existsSync(join(dirOf(), "moved.txt"))).toBe(true);
    expect(await readRepoState(dirOf())).toMatchObject({ commit: moved, updatedAt: Date.now(), checkedAt: Date.now() });
  });

  it("keeps the clone, only marks the check, when the ref did not move", async () => {
    vi.setSystemTime(1_000);
    const repo: UpstreamRepo = { url: source, ref: "HEAD", setup: [{ command: "node", args: ["-e", WRITE_STAMP] }] };
    await ensure(repo);
    const stamp = readFileSync(join(dirOf(), "stamp.txt"), "utf8");

    later(REPO_CHECK_INTERVAL_MS);
    await ensure(repo);

    expect(readFileSync(join(dirOf(), "stamp.txt"), "utf8")).toBe(stamp);
    expect(await readRepoState(dirOf())).toMatchObject({ commit, updatedAt: 1_000, checkedAt: Date.now() });
  });

  it("follows an annotated tag to its commit", async () => {
    git(source, "tag", "-a", "v1", "-m", "v1");
    const repo: UpstreamRepo = { url: source, ref: "v1" };
    await ensure(repo);
    const stamp = (await readRepoState(dirOf()))?.updatedAt;

    later(REPO_CHECK_INTERVAL_MS);
    await ensure(repo);

    expect(await readRepoState(dirOf())).toMatchObject({ commit, updatedAt: stamp });
  });

  it("keeps the clone and warns when the remote cannot be reached", async () => {
    vi.setSystemTime(1_000);
    const repo: UpstreamRepo = { url: source, ref: "HEAD" };
    await ensure(repo);
    rmSync(source, { recursive: true, force: true });
    const warnings: string[] = [];

    later(REPO_CHECK_INTERVAL_MS);
    await ensure(repo, warnings);
    await ensure(repo, warnings);

    expect(existsSync(join(dirOf(), "fake-mcp-server.mjs"))).toBe(true);
    expect(warnings).toEqual([expect.stringContaining("using the clone it has")]);
  });

  it("never compares a pinned commit", async () => {
    vi.setSystemTime(1_000);
    const repo: UpstreamRepo = { url: source, ref: commit };
    await ensure(repo);
    rmSync(source, { recursive: true, force: true });
    const warnings: string[] = [];

    later(REPO_CHECK_INTERVAL_MS * 10);
    await ensure(repo, warnings);

    expect(warnings).toEqual([]);
    expect(await readRepoState(dirOf())).toMatchObject({ commit, checkedAt: 1_000 });
  });

  it("does not compare when checking is turned off", async () => {
    vi.setSystemTime(1_000);
    const repo: UpstreamRepo = { url: source, ref: "HEAD" };
    await ensure(repo);
    commitFile("moved.txt");

    later(REPO_CHECK_INTERVAL_MS);
    await ensure(repo, [], false);

    expect(existsSync(join(dirOf(), "moved.txt"))).toBe(false);
  });

  it("adopts a clone marked before states existed and rebuilds it only when its ref moved", async () => {
    const repo: UpstreamRepo = { url: source, ref: "HEAD" };
    await ensure(repo);
    writeFileSync(join(dirOf(), ".mcpkit-ready"), JSON.stringify(repo));
    const moved = commitFile("moved.txt");

    await ensure(repo);

    expect(existsSync(join(dirOf(), "moved.txt"))).toBe(true);
    expect((await readRepoState(dirOf()))?.commit).toBe(moved);
  });
});
