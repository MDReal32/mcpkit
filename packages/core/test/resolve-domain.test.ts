import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { useTempDir } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import { resolveDomain } from "../src/auth";
import type { Manifest } from "../src/main";

const readHome = useTempDir("mcpkit-resolve-domain-");

const createManifest = (matchGitRemote: boolean) => {
  const manifest: Manifest = {
    name: "gitlab",
    category: "git",
    description: "test",
    version: "1.0.0",
    baseUrl: "https://{domain}/api",
    domain: { default: "gitlab.com", env: "GITLAB_HOST", matchGitRemote },
    tools: [],
  };
  return manifest;
};

const createRepo = async (name: string, remote: string) => {
  const dir = join(readHome(), name);
  await mkdir(dir, { recursive: true });
  execFileSync("git", ["init", "-q"], { cwd: dir });
  execFileSync("git", ["remote", "add", "origin", remote], { cwd: dir });
  return dir;
};

const saveConfig = (servers: unknown) => writeFile(join(readHome(), "config.json"), JSON.stringify({ servers }));

const twoHosts = {
  gitlab: {
    domain: "gitlab.a.example",
    hosts: { "gitlab.a.example": {}, "gitlab.b.example": {} },
  },
};

describe("resolveDomain with several hosts", () => {
  it("picks the known host the git remote points at", async () => {
    await saveConfig(twoHosts);
    const projectDir = await createRepo("repo-b", "git@gitlab.b.example:team/app.git");

    const domain = await resolveDomain(createManifest(true), {
      env: { MCPKIT_HOME: readHome() },
      fetchImpl: fetch,
      projectDir,
    });

    expect(domain).toBe("gitlab.b.example");
  });

  it("asks when the remote cannot tell and the project is not bound", async () => {
    await saveConfig(twoHosts);
    const projectDir = await createRepo("repo-x", "https://other.example/team/app.git");

    const domain = await resolveDomain(createManifest(true), {
      env: { MCPKIT_HOME: readHome() },
      fetchImpl: fetch,
      projectDir,
    });

    expect(domain).toBeUndefined();
  });

  it("uses the host a project was bound to", async () => {
    const projectDir = await createRepo("repo-j", "https://other.example/team/app.git");
    await saveConfig({ gitlab: { ...twoHosts.gitlab, projects: { [await realKey(projectDir)]: "gitlab.b.example" } } });

    const domain = await resolveDomain(createManifest(false), {
      env: { MCPKIT_HOME: readHome() },
      fetchImpl: fetch,
      projectDir,
    });

    expect(domain).toBe("gitlab.b.example");
  });

  it("lets the env var win and keeps the last host without a project", async () => {
    await saveConfig(twoHosts);

    const fromEnv = await resolveDomain(createManifest(true), {
      env: { MCPKIT_HOME: readHome(), GITLAB_HOST: "env.example" },
      fetchImpl: fetch,
      projectDir: readHome(),
    });
    const withoutProject = await resolveDomain(createManifest(true), {
      env: { MCPKIT_HOME: readHome() },
      fetchImpl: fetch,
    });

    expect(fromEnv).toBe("env.example");
    expect(withoutProject).toBe("gitlab.a.example");
  });
});

const realKey = async (dir: string) =>
  execFileSync("git", ["rev-parse", "--show-toplevel"], { cwd: dir, encoding: "utf8" }).trim();
