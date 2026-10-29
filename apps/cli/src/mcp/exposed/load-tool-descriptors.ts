import { TOOL_ID_SEPARATOR } from "../tools/const";
import type { Catalog } from "../types/catalog";
import type { CatalogServer } from "../types/catalog-server";
import { EMPTY_INPUT_SCHEMA } from "./const";
import type { ToolDescriptor } from "./tool-descriptor";

const loadUpstreamDescriptors = (server: CatalogServer, tools: NonNullable<Catalog["upstreams"]>) => {
  const discovered = tools.get(server.id)?.tools;
  return server.tools.flatMap((tool) => {
    const found = discovered?.get(tool);
    if (!found) {
      return [];
    }
    return [{ tool, description: found.description ?? "", inputSchema: found.inputSchema ?? EMPTY_INPUT_SCHEMA }];
  });
};

/** A server split into parts keeps one part per group, so one tool of each group is enough to load all of them. */
const pickOneToolPerGroup = (tools: readonly string[]) => {
  const byGroup = new Map<string, string>();
  for (const tool of tools) {
    const [group = ""] = tool.split(TOOL_ID_SEPARATOR);
    if (!byGroup.has(group)) {
      byGroup.set(group, tool);
    }
  }
  return [...byGroup.values()];
};

/** The description and schema of every tool of a server, from its manifest or from what its upstream reported. */
export const loadToolDescriptors = async (catalog: Catalog, server: CatalogServer): Promise<ToolDescriptor[]> => {
  if (catalog.upstreams?.has(server.id)) {
    return loadUpstreamDescriptors(server, catalog.upstreams);
  }
  const manifests = await Promise.all(
    pickOneToolPerGroup(server.tools).map((tool) => catalog.loadManifest(server.id, tool)),
  );
  const specs = new Map(manifests.flatMap((manifest) => manifest.tools.map((spec) => [spec.name, spec] as const)));
  return server.tools.flatMap((tool) => {
    const spec = specs.get(tool);
    return spec ? [{ tool, description: spec.description, inputSchema: { ...spec.input } }] : [];
  });
};
