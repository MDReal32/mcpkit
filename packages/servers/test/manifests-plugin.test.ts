import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { useTempDir } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import { compileServers } from "../plugins/manifests";
import { writeManifests } from "../plugins/manifests/write-manifests";

const readDir = useTempDir("usemcpkit-servers-");

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
      "bitwarden",
      "clickup",
      "cloudflare",
      "confluence",
      "discord",
      "figma",
      "github",
      "gitlab",
      "jira",
      "medium",
      "n8n",
      "postman",
      "reddit",
      "teams",
    ]);
    const github = compiled.find(({ manifest }) => manifest.name === "github");
    expect(JSON.parse(github?.json ?? "null")).toEqual(github?.manifest);
    expect(github?.manifest.openapi?.sources.map((source) => source.name)).toEqual(["dotcom", "enterprise"]);
    const reddit = compiled.find(({ manifest }) => manifest.name === "reddit");
    const [spec] = reddit?.specs ?? [];
    expect(reddit?.manifest.openapi?.sources[0]?.url).toBe("communication/reddit/openapi.json");
    expect(spec?.path).toBe("communication/reddit/openapi.json");
    expect(reddit?.manifest.openapi?.sources[0]?.sha256).toBe(
      createHash("sha256")
        .update(spec?.json ?? "")
        .digest("hex"),
    );
    expect(dependencies.some((dependency) => dependency.endsWith("servers/reddit/openapi.json"))).toBe(true);
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
  it("writes <category>/<name>.json, the hand-written documents beside it and a light index of ids, relative links and checksums", async () => {
    const { compiled } = await compileServers(resolve("src/servers"));

    await writeManifests(compiled, readDir());

    const index = JSON.parse(await readFile(join(readDir(), "index.json"), "utf8"));
    const github = index.servers.find((server: { id: string }) => server.id === "git:github");
    const file = await readFile(join(readDir(), "git", "github.json"), "utf8");
    expect(github).toMatchObject({ url: "git/github.json", openapi: true });
    expect(github.tools).toBeUndefined();
    expect(github.sha256).toBe(createHash("sha256").update(file).digest("hex"));
    expect(JSON.parse(file).tools.map((tool: { name: string }) => tool.name)).toEqual([
      "repos/{owner}/{repo}/releases/assets/{asset_id}:get",
    ]);
    const reddit = JSON.parse(await readFile(join(readDir(), "communication", "reddit.json"), "utf8"));
    const spec = await readFile(join(readDir(), "communication", "reddit", "openapi.json"), "utf8");
    expect(reddit.openapi.sources[0].sha256).toBe(createHash("sha256").update(spec).digest("hex"));
    const teams = index.servers.find((server: { id: string }) => server.id === "communication:teams");
    expect(teams.openapi).toBeUndefined();
  });

  it("splits a server whose tools are all <group>:<resource>:<action> into a shell and one file per group", async () => {
    const tool = (name: string) => ({ ...VALID_DEFINITION.tools[0], name });
    const definition = { name: "grouped", ...VALID_DEFINITION, tools: [tool("a:x:list"), tool("b:y:get")] };
    await writeServer("grouped", `export const grouped = ${JSON.stringify(definition)};\n`);
    const { compiled } = await compileServers(readDir());
    const out = join(readDir(), "out");

    await writeManifests(compiled, out);

    const shell = JSON.parse(await readFile(join(out, "test", "grouped.json"), "utf8"));
    expect(shell.tools).toBeUndefined();
    const part = await readFile(join(out, "test", "grouped", "a.json"), "utf8");
    expect(shell.parts[0]).toEqual({
      name: "a",
      url: "test/grouped/a.json",
      sha256: createHash("sha256").update(part).digest("hex"),
    });
    expect(JSON.parse(part).tools.map((found: { name: string }) => found.name)).toEqual(["a:x:list"]);
  });
});
