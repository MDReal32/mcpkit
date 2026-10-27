import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { useTempDir } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import { compileServers } from "../plugins/manifests";
import { writeManifests } from "../plugins/manifests/write-manifests";

const readDir = useTempDir("mcpkit-servers-");

const VALID_DEFINITION = {
  category: "test",
  version: "1.0.0",
  baseUrl: "https://api.example.com",
  tools: [{ name: "ping", description: "Ping", input: { type: "object" }, request: { method: "GET", path: "/ping" } }],
};

const writeServer = async (dir: string, source: string) => {
  await mkdir(join(readDir(), dir), { recursive: true });
  await writeFile(join(readDir(), dir, `${dir}.ts`), source);
};

describe("compileServers", () => {
  it("compiles src/servers into valid JSON manifests", async () => {
    const { compiled, errors, dependencies } = await compileServers(resolve("src/servers"));

    expect(errors).toEqual([]);
    expect(compiled.map(({ manifest }) => manifest.name)).toEqual([
      "clickup",
      "confluence",
      "discord",
      "github",
      "gitlab",
      "jira",
    ]);
    const github = compiled.find(({ manifest }) => manifest.name === "github");
    expect(JSON.parse(github?.json ?? "null")).toEqual(github?.manifest);
    expect(github?.manifest.tools.find((tool) => tool.name === "issues:issues:create")?.input.required).toEqual([
      "owner",
      "repo",
      "title",
    ]);
    expect(dependencies.some((dependency) => dependency.endsWith("src/sdk/index.ts"))).toBe(true);
  });

  it("maps dashes in folder names to underscores in server names", async () => {
    await writeServer("my-api", `export const myApi = ${JSON.stringify({ name: "my_api", ...VALID_DEFINITION })};\n`);

    const { compiled, errors } = await compileServers(readDir());

    expect(errors).toEqual([]);
    expect(compiled.map(({ manifest }) => manifest.name)).toEqual(["my_api"]);
  });

  it("reports invalid definitions, name mismatches, export problems and missing entries per folder", async () => {
    await writeServer("broken", "export const broken = { name: 'broken', version: '1.0.0' };\n");
    await writeServer("other", `export const other = ${JSON.stringify({ name: "renamed", ...VALID_DEFINITION })};\n`);
    await writeServer("twice", "export const a = 1;\nexport const b = 2;\n");
    await mkdir(join(readDir(), "empty"));

    const { compiled, errors } = await compileServers(readDir());

    expect(compiled).toEqual([]);
    expect(errors).toEqual([
      "broken: category must match /^[a-z][a-z0-9-]*$/",
      "broken: baseUrl must be an https:// URL",
      "broken: tools must be a non-empty array",
      "empty: missing entry file empty/empty.ts",
      'other: name "renamed" must match folder name "other" (expected "other")',
      expect.stringMatching(/^twice: failed to load .*expected exactly one named export, found 2 \(a, b\)$/),
    ]);
  });
});

describe("writeManifests", () => {
  it("writes <category>/<name>.json and an index of ids, tool names, links and checksums", async () => {
    const { compiled } = await compileServers(resolve("src/servers"));

    await writeManifests(compiled, join(readDir(), "linked"), "https://reg.example/mcpkit/");
    await writeManifests(compiled, join(readDir(), "plain"));

    const read = async (dir: string) => JSON.parse(await readFile(join(readDir(), dir, "index.json"), "utf8"));
    const linked = (await read("linked")).servers.find((server: { id: string }) => server.id === "git:github");
    const plain = (await read("plain")).servers.find((server: { id: string }) => server.id === "git:github");
    const file = await readFile(join(readDir(), "linked", "git", "github.json"), "utf8");
    expect(linked.url).toBe("https://reg.example/mcpkit/git/github.json");
    expect(plain.url).toBe("git/github.json");
    expect(linked.tools).toContain("issues:issues:create");
    const shell = JSON.parse(file);
    expect(shell.tools).toBeUndefined();
    const issues = shell.parts.find((part: { name: string }) => part.name === "issues");
    expect(issues.url).toBe("https://reg.example/mcpkit/git/github/issues.json");
    const part = await readFile(join(readDir(), "linked", "git", "github", "issues.json"), "utf8");
    expect(issues.sha256).toBe(createHash("sha256").update(part).digest("hex"));
    expect(JSON.parse(part).tools.map((tool: { name: string }) => tool.name)).toContain("issues:issues:create");
    expect(linked.sha256).toBe(createHash("sha256").update(file).digest("hex"));
  });
});
