import { describeError } from "@usemcpkit/core";
import { findTool } from "../tools/find-tool";
import type { Catalog } from "../types/catalog";
import type { McpOptions } from "../types/mcp-options";
import type { MetaTool } from "../types/meta-tool";
import { listExposedTools } from "./list-exposed-tools";

const describeOne = async (catalog: Catalog, id: string, name: string) => {
  const found = findTool(catalog, id);
  if ("error" in found) {
    throw new Error(found.error);
  }
  const manifest = await catalog.loadManifest(found.serverId, found.tool);
  const tool = manifest.tools.find((candidate) => candidate.name === found.tool);
  if (!tool) {
    throw new Error(`"${id}" is not in the manifest of ${found.serverId}`);
  }
  return { name, description: tool.description, inputSchema: tool.input } satisfies MetaTool;
};

/** The exposed tools as MCP tool definitions; one that cannot be described is reported and left out. */
export const describeExposedTools = async (catalog: Catalog, options: McpOptions) => {
  const patterns = (await options.exposedTools?.()) ?? [];
  if (patterns.length === 0) {
    return [];
  }
  const { tools, skipped } = listExposedTools(catalog, patterns);
  for (const reason of skipped) {
    options.onWarning?.(`not exposed, ${reason}`);
  }
  const described = await Promise.all(
    tools.map(async ({ id, name }) => {
      try {
        return await describeOne(catalog, id, name);
      } catch (error) {
        options.onWarning?.(`not exposed, ${id}: ${describeError(error)}`);
        return undefined;
      }
    }),
  );
  return described.filter((tool) => tool !== undefined);
};
