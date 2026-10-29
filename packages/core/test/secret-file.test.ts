import { readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { useTempDir } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { SecretOwner } from "../src/main";
import { createFileSecretStore } from "../src/main";

const readHome = useTempDir("mcpkit-secret-file-");

const github: SecretOwner = { name: "github", category: "git" };

const jira: SecretOwner = { name: "jira", category: "atlassian" };

const readSecretsFile = () => join(readHome(), "config.json");

const readLegacyFile = () => join(readHome(), "secrets.json");

describe("createFileSecretStore", () => {
  it("returns undefined when nothing is saved", async () => {
    const store = createFileSecretStore({ MCPKIT_HOME: readHome() });

    await expect(store.get(github, "GITHUB_TOKEN")).resolves.toBeUndefined();
  });

  it("saves plain text by server and key in a private file", async () => {
    const store = createFileSecretStore({ MCPKIT_HOME: readHome() });

    await store.set(github, "GITHUB_TOKEN", "ghp_1");
    await store.set(jira, "JIRA_TOKEN", "jt");

    const data: unknown = JSON.parse(await readFile(readSecretsFile(), "utf8"));
    expect(data).toEqual({
      version: 4,
      servers: {
        git: { github: { hosts: { default: { secrets: { GITHUB_TOKEN: "ghp_1" } } } } },
        atlassian: { jira: { hosts: { default: { secrets: { JIRA_TOKEN: "jt" } } } } },
      },
    });
    expect((await stat(readSecretsFile())).mode & 0o777).toBe(0o600);
  });

  it("keeps concurrent saves and sees saves from other stores", async () => {
    const first = createFileSecretStore({ MCPKIT_HOME: readHome() });
    const second = createFileSecretStore({ MCPKIT_HOME: readHome() });

    await Promise.all([first.set(github, "A", "1"), first.set(github, "B", "2")]);

    await expect(second.get(github, "A")).resolves.toBe("1");
    await expect(second.get(github, "B")).resolves.toBe("2");
  });

  it("fails on a malformed file instead of overwriting it", async () => {
    await writeFile(
      readSecretsFile(),
      JSON.stringify({
        version: 4,
        servers: { git: { github: { hosts: { default: { secrets: { GITHUB_TOKEN: 1 } } } } } },
      }),
    );
    const store = createFileSecretStore({ MCPKIT_HOME: readHome() });

    await expect(store.set(github, "GITHUB_TOKEN", "x")).rejects.toThrow("not a valid mcpkit config file");
  });

  it("keeps the secrets of each host apart", async () => {
    const store = createFileSecretStore({ MCPKIT_HOME: readHome() });

    await store.set({ ...github, domain: "ghe.example.com" }, "GITHUB_TOKEN", "ghp_1");
    await store.set({ ...github, domain: "api.github.com" }, "GITHUB_TOKEN", "ghp_2");

    await expect(store.get({ ...github, domain: "ghe.example.com" }, "GITHUB_TOKEN")).resolves.toBe("ghp_1");
    await expect(store.get({ ...github, domain: "api.github.com" }, "GITHUB_TOKEN")).resolves.toBe("ghp_2");
    await expect(store.get(github, "GITHUB_TOKEN")).resolves.toBeUndefined();
  });

  it("keeps the secrets under the host of a server", async () => {
    await writeFile(
      readSecretsFile(),
      JSON.stringify({ version: 4, servers: { git: { github: { hosts: { "ghe.example.com": {} } } } } }),
    );
    const store = createFileSecretStore({ MCPKIT_HOME: readHome() });

    await store.set({ ...github, domain: "ghe.example.com" }, "GITHUB_TOKEN", "ghp_1");

    const data: unknown = JSON.parse(await readFile(readSecretsFile(), "utf8"));
    expect(data).toEqual({
      version: 4,
      servers: { git: { github: { hosts: { "ghe.example.com": { secrets: { GITHUB_TOKEN: "ghp_1" } } } } } },
    });
  });

  it("moves an old secrets.json into the config file and removes it", async () => {
    await writeFile(readLegacyFile(), JSON.stringify({ github: { GITHUB_TOKEN: "old" } }));
    await writeFile(
      readSecretsFile(),
      JSON.stringify({ version: 4, servers: { git: { github: { hosts: { "ghe.example.com": {} } } } } }),
    );
    const store = createFileSecretStore({ MCPKIT_HOME: readHome() });

    await expect(store.get({ ...github, domain: "ghe.example.com" }, "GITHUB_TOKEN")).resolves.toBe("old");

    const data: unknown = JSON.parse(await readFile(readSecretsFile(), "utf8"));
    expect(data).toEqual({
      version: 4,
      servers: { git: { github: { hosts: { "ghe.example.com": { secrets: { GITHUB_TOKEN: "old" } } } } } },
    });
    await expect(stat(readLegacyFile())).rejects.toThrow();
  });

  it("upgrades a config without a version, and its old secrets.json, to version 4", async () => {
    await writeFile(
      readSecretsFile(),
      JSON.stringify({ servers: { github: { domain: "ghe.example.com" }, jira: {} } }),
    );
    await writeFile(readLegacyFile(), JSON.stringify({ github: { GITHUB_TOKEN: "old" }, jira: { JIRA_TOKEN: "jt" } }));
    const store = createFileSecretStore({ MCPKIT_HOME: readHome() });

    await expect(store.get(jira, "JIRA_TOKEN")).resolves.toBe("jt");

    const data: unknown = JSON.parse(await readFile(readSecretsFile(), "utf8"));
    expect(data).toEqual({
      version: 4,
      servers: {
        git: { github: { hosts: { "ghe.example.com": { secrets: { GITHUB_TOKEN: "old" } } } } },
        atlassian: { jira: { hosts: { default: { secrets: { JIRA_TOKEN: "jt" } } } } },
      },
    });
  });

  it("upgrades a version 1 config that keeps secrets per server", async () => {
    await writeFile(
      readSecretsFile(),
      JSON.stringify({ servers: { github: { domain: "ghe.example.com", secrets: { GITHUB_TOKEN: "t" } } } }),
    );
    const store = createFileSecretStore({ MCPKIT_HOME: readHome() });

    await store.set({ ...github, domain: "ghe.example.com" }, "OTHER", "o");

    const data: unknown = JSON.parse(await readFile(readSecretsFile(), "utf8"));
    expect(data).toEqual({
      version: 4,
      servers: {
        git: { github: { hosts: { "ghe.example.com": { secrets: { GITHUB_TOKEN: "t", OTHER: "o" } } } } },
      },
    });
  });

  it("upgrades a version 2 config by dropping the last used domain and grouping servers by category", async () => {
    await writeFile(
      readSecretsFile(),
      JSON.stringify({
        version: 2,
        servers: {
          github: { domain: "ghe.example.com", hosts: { "ghe.example.com": { secrets: { GITHUB_TOKEN: "t" } } } },
          jira: { domain: "jira.example.com" },
          custom: { hosts: { default: { secrets: { CUSTOM_TOKEN: "c" } } } },
        },
      }),
    );
    const store = createFileSecretStore({ MCPKIT_HOME: readHome() });

    await expect(store.get({ ...github, domain: "ghe.example.com" }, "GITHUB_TOKEN")).resolves.toBe("t");

    const data: unknown = JSON.parse(await readFile(readSecretsFile(), "utf8"));
    expect(data).toEqual({
      version: 4,
      servers: {
        git: { github: { hosts: { "ghe.example.com": { secrets: { GITHUB_TOKEN: "t" } } } } },
        atlassian: { jira: { hosts: { "jira.example.com": {} } } },
        other: { custom: { hosts: { default: { secrets: { CUSTOM_TOKEN: "c" } } } } },
      },
    });
  });

  it("refuses a config from a newer mcpkit instead of overwriting it", async () => {
    await writeFile(readSecretsFile(), JSON.stringify({ version: 5, servers: {} }));
    const store = createFileSecretStore({ MCPKIT_HOME: readHome() });

    await expect(store.set(github, "GITHUB_TOKEN", "x")).rejects.toThrow("update mcpkit");
  });

  it("keeps hosts and projects of a config written before versions existed", async () => {
    const servers = {
      gitlab: {
        domain: "gitlab.a.example",
        hosts: { "gitlab.a.example": { secrets: { GITLAB_TOKEN: "t" } } },
        projects: { "/work/app": "gitlab.a.example" },
      },
    };
    await writeFile(readSecretsFile(), JSON.stringify({ servers }));
    const store = createFileSecretStore({ MCPKIT_HOME: readHome() });

    await expect(
      store.get({ name: "gitlab", category: "git", domain: "gitlab.a.example" }, "GITLAB_TOKEN"),
    ).resolves.toBe("t");

    const data: unknown = JSON.parse(await readFile(readSecretsFile(), "utf8"));
    expect(data).toEqual({
      version: 4,
      servers: { git: { gitlab: { hosts: servers.gitlab.hosts, projects: servers.gitlab.projects } } },
    });
  });
});
