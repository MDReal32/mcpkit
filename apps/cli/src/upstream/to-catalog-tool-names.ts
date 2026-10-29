import type { UpstreamNameRule } from "@usemcpkit/core";
import { nameUpstreamTool } from "@usemcpkit/core";
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

/**
 * Catalog names for upstream tool names. A tool a naming rule matches gets the rule's `<group>:<resource>:<action>`;
 * any other, such as `searchIssues` or `search-issues`, becomes `tools:search_issues`. Clashes get a number.
 */
export const toCatalogToolNames = (upstreamNames: readonly string[], naming?: readonly UpstreamNameRule[]) => {
  const taken = new Set<string>();
  return upstreamNames.map((upstreamName) => {
    const base = nameUpstreamTool(naming, upstreamName) ?? `${UPSTREAM_TOOL_GROUP}:${toSegment(upstreamName)}`;
    let candidate = base;
    for (let copy = 2; taken.has(candidate); copy += 1) {
      candidate = `${base}_${copy}`;
    }
    taken.add(candidate);
    return { upstreamName, name: candidate };
  });
};
