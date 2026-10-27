import { describeError } from "@usemcpkit/core";
import { createJsonResult } from "../tools/create-json-result";
import { createTextResult } from "../tools/create-text-result";
import { findTool } from "../tools/find-tool";
import type { Catalog } from "../types/catalog";

export const describeTool = async (catalog: Catalog, id: string) => {
  const found = findTool(catalog, id);
  if ("error" in found) {
    return createTextResult(found.error, true);
  }
  const discovered = catalog.upstreams?.get(found.serverId)?.tools.get(found.tool);
  if (discovered) {
    return createJsonResult({ id, description: discovered.description, inputSchema: discovered.inputSchema });
  }
  try {
    const manifest = await catalog.loadManifest(found.serverId, found.tool);
    const tool = manifest.tools.find((candidate) => candidate.name === found.tool);
    if (!tool) {
      return createTextResult(`"${id}" is not in the manifest of ${found.serverId}`, true);
    }
    return createJsonResult({ id, description: tool.description, inputSchema: tool.input });
  } catch (error) {
    return createTextResult(describeError(error), true);
  }
};
