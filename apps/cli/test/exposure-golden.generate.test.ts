import { writeFileSync } from "node:fs";
import { useTempDir } from "@usemcpkit/testing";
import { it } from "vitest";
import { createToolExposure } from "../src/mcp/exposed";
import { createBuiltRegistryCatalog } from "./fixtures/create-built-registry-catalog";

const OUTPUT = process.env.GOLDEN_OUTPUT ?? "";

const tempDir = useTempDir("mcpkit-golden-");

/**
 * Writes `apps/server/tests/fixtures/exposed-tools.json`, which the Rust server's exposure test compares against: every
 * section and tool name after opening each server that is not an upstream, and each of its groups, in list order.
 */
it.skipIf(OUTPUT === "")("writes the exposed tool list golden file", async () => {
  const catalog = await createBuiltRegistryCatalog(tempDir());
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
