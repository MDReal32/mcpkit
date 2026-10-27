import { UPSTREAM_TOOL_GROUP } from "./const";

const toSnakeCase = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const toSegment = (name: string) => {
  const snake = toSnakeCase(name);
  return /^[a-z]/.test(snake) ? snake : `t_${snake}`;
};

/** Catalog names for upstream tool names: `searchIssues` and `search-issues` become `tools:search_issues`, clashes get a number. */
export const toCatalogToolNames = (upstreamNames: readonly string[]) => {
  const taken = new Set<string>();
  return upstreamNames.map((upstreamName) => {
    const segment = toSegment(upstreamName);
    let candidate = segment;
    for (let copy = 2; taken.has(candidate); copy += 1) {
      candidate = `${segment}_${copy}`;
    }
    taken.add(candidate);
    return { upstreamName, name: `${UPSTREAM_TOOL_GROUP}:${candidate}` };
  });
};
