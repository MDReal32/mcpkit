import { describeError } from "@usemcpkit/core";
import { ACTION_WORD_SEPARATOR } from "../annotations/const";
import { createToolAnnotations } from "../annotations/create-tool-annotations";
import { TOOL_ID_SEPARATOR } from "../tools/const";
import type { Catalog } from "../types/catalog";
import type { McpOptions } from "../types/mcp-options";
import { createToolName } from "./create-tool-name";
import type { ExposedTool } from "./exposed-tool";
import { loadToolDescriptors } from "./load-tool-descriptors";

const readVerb = (tool: string) => (tool.split(TOOL_ID_SEPARATOR).at(-1) ?? "").split(ACTION_WORD_SEPARATOR)[0] ?? "";

const pickFreeName = (serverId: string, tool: string, taken: ReadonlySet<string>) => {
  let attempt = 0;
  let name = createToolName(serverId, tool, attempt);
  while (taken.has(name)) {
    attempt += 1;
    name = createToolName(serverId, tool, attempt);
  }
  return name;
};

/**
 * Every tool of the catalog as its own MCP tool, in catalog order. A server whose tools cannot be loaded is left out
 * and reported through `onWarning`, so one broken server never hides the others.
 */
export const createExposedTools = async (catalog: Catalog, options: McpOptions) => {
  const perServer = await Promise.all(
    catalog.servers.map(async (server) => {
      try {
        return { server, descriptors: await loadToolDescriptors(catalog, server) };
      } catch (error) {
        options.onWarning?.(`${server.id}: its tools are not listed: ${describeError(error)}`);
        return { server, descriptors: [] };
      }
    }),
  );
  const taken = new Set<string>();
  const exposed: ExposedTool[] = [];
  for (const { server, descriptors } of perServer) {
    for (const { tool, description, inputSchema } of descriptors) {
      const name = pickFreeName(server.id, tool, taken);
      taken.add(name);
      exposed.push({
        name,
        serverId: server.id,
        tool,
        description,
        inputSchema,
        annotations: createToolAnnotations(readVerb(tool)),
      });
    }
  }
  return exposed;
};
