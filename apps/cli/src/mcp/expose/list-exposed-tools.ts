import { createToolId } from "../tools/create-tool-id";
import type { Catalog } from "../types/catalog";
import { MAX_EXPOSED_NAME_LENGTH } from "./const";
import { createExposedName } from "./create-exposed-name";
import { matchesExposedTool } from "./matches-exposed-tool";
import type { ExposedTool } from "./types";

export interface ExposedToolListing {
  tools: readonly ExposedTool[];
  /** Matching tools that cannot be listed, each with the reason. */
  skipped: readonly string[];
}

export const listExposedTools = (catalog: Catalog, patterns: readonly string[]) => {
  const tools: ExposedTool[] = [];
  const skipped: string[] = [];
  const taken = new Map<string, string>();
  const ids = catalog.servers.flatMap((server) => server.tools.map((tool) => createToolId(server.id, tool)));
  for (const id of ids.filter((candidate) => patterns.some((pattern) => matchesExposedTool(candidate, pattern)))) {
    const name = createExposedName(id);
    const owner = taken.get(name);
    if (name.length > MAX_EXPOSED_NAME_LENGTH) {
      skipped.push(`${id}: the name "${name}" is longer than ${MAX_EXPOSED_NAME_LENGTH} characters`);
    } else if (owner !== undefined) {
      skipped.push(`${id}: the name "${name}" is already used by ${owner}`);
    } else {
      taken.set(name, id);
      tools.push({ name, id });
    }
  }
  return { tools, skipped } satisfies ExposedToolListing;
};
