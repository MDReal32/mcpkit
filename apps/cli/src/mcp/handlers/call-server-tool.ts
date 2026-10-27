import type { ToolArgs } from "@usemcpkit/core";
import { describeError, executeTool } from "@usemcpkit/core";
import { createJsonResult } from "../tools/create-json-result";
import { createTextResult } from "../tools/create-text-result";
import { findTool } from "../tools/find-tool";
import type { Catalog } from "../types/catalog";
import type { McpOptions } from "../types/mcp-options";

/** Failures are returned to the model as isError results, not protocol errors. */
export const callServerTool = async (catalog: Catalog, id: string, args: ToolArgs | undefined, options: McpOptions) => {
  const found = findTool(catalog, id);
  if ("error" in found) {
    return createTextResult(found.error, true);
  }
  options.onToolUse?.(id);
  const upstream = catalog.upstreams?.get(found.serverId);
  try {
    if (upstream) {
      const discovered = upstream.tools.get(found.tool);
      return discovered
        ? await upstream.call(discovered, args, options)
        : createTextResult(`"${id}" is not on ${found.serverId}`, true);
    }
    const manifest = await catalog.loadManifest(found.serverId, found.tool);
    const tool = manifest.tools.find((candidate) => candidate.name === found.tool);
    if (!tool) {
      return createTextResult(`"${id}" is not in the manifest of ${found.serverId}`, true);
    }
    return createJsonResult(await executeTool(manifest, tool, args, options));
  } catch (error) {
    return createTextResult(describeError(error), true);
  }
};
