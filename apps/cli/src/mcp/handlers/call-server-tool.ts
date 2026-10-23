import type { ExecuteOptions, ToolArgs } from '@usemcpkit/core';
import { describeError, executeTool } from '@usemcpkit/core';
import { createJsonResult } from '../tools/create-json-result';
import { createTextResult } from '../tools/create-text-result';
import { findTool } from '../tools/find-tool';
import type { Catalog } from '../types/catalog';

/** Failures are returned to the model as isError results, not protocol errors. */
export const callServerTool = async (
  catalog: Catalog,
  id: string,
  args: ToolArgs | undefined,
  options: ExecuteOptions,
) => {
  const found = findTool(catalog, id);
  if ('error' in found) {
    return createTextResult(found.error, true);
  }
  try {
    const manifest = await catalog.loadManifest(found.serverId);
    const tool = manifest.tools.find((candidate) => candidate.name === found.tool);
    if (!tool) {
      return createTextResult(`"${id}" is not in the manifest of ${found.serverId}`, true);
    }
    return createJsonResult(await executeTool(manifest, tool, args, options));
  } catch (error) {
    return createTextResult(describeError(error), true);
  }
};
