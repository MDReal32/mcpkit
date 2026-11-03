import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "vitest";
import { createToolExposure } from "../src/mcp/exposed";
import type { Catalog } from "../src/mcp/types/catalog";

const REGISTRY = join(__dirname, "../../../packages/servers/build/manifests");
const OUTPUT = process.env.GOLDEN_OUTPUT ?? "";

const readJson = (link: string) =>
  JSON.parse(readFileSync(join(REGISTRY, link.replace(/^https?:\/\/[^/]+\/mcpkit\//, "")), "utf8"));

it.skipIf(OUTPUT === "")("writes the exposed tool list golden file", async () => {
  const index = readJson("index.json");
  const manifestOf = (id: string) => {
    const server = index.servers.find((candidate: { id: string }) => candidate.id === id);
    return readJson(server.url);
  };
  const catalog: Catalog = {
    servers: index.servers.map(({ id, description, upstream }: Record<string, unknown>) => ({
      id,
      description,
      upstream,
    })),
    loadManifest: async () => {
      throw new Error("not used");
    },
    loadGroups: async (id) => (manifestOf(id).parts ?? []).map((part: { name: string }) => part.name),
    loadGroupManifest: async (id, group) => {
      const file = manifestOf(id);
      if (!file.parts) {
        return file;
      }
      const part = file.parts.find((candidate: { name: string }) => candidate.name === group);
      return { ...file, tools: readJson(part.url).tools };
    },
  };
  const exposure = createToolExposure(catalog, {});
  for (const server of catalog.servers) {
    if (server.upstream) {
      continue;
    }
    const root = exposure.list().find((entry) => entry.kind === "section" && entry.serverId === server.id);
    if (root?.kind !== "section") {
      throw new Error(`no section for ${server.id}`);
    }
    await exposure.open(root);
    const groups = exposure.list().filter((entry) => entry.kind === "section" && entry.serverId === server.id);
    for (const group of groups) {
      if (group.kind === "section" && group.group !== undefined) {
        await exposure.open(group);
      }
    }
  }
  const entries = exposure.list().map((entry) => ({
    name: entry.name,
    id:
      entry.kind === "section"
        ? `${entry.serverId}${entry.group ? `:${entry.group}` : ""}`
        : `${entry.serverId}:${entry.tool}`,
    kind: entry.kind,
    ...(entry.kind === "section" ? { description: entry.description } : {}),
    ...(entry.annotations ? { annotations: entry.annotations } : {}),
  }));
  writeFileSync(OUTPUT, `${JSON.stringify(entries, null, 1)}\n`);
});
