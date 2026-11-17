import { nameUpstreamTool } from "@usemcpkit/core";
import { describe, expect, it } from "vitest";
import { graphify } from "../src/servers/graphify/graphify";

const UPSTREAM_TOOLS =
  "query_graph get_node get_section get_neighbors get_community god_nodes graph_stats shortest_path list_prs get_pr_impact triage_prs".split(
    " ",
  );
const MAX_NAME_LENGTH = 51;

const naming = graphify.upstream?.naming;

describe("graphify naming rules", () => {
  const names = UPSTREAM_TOOLS.map((tool) => nameUpstreamTool(naming, tool));

  it("name every tool of the server as <group>:<resource>:<action>", () => {
    expect(names.filter((name) => name === undefined)).toEqual([]);
  });

  it("never give two tools the same name", () => {
    expect(new Set(names).size).toBe(UPSTREAM_TOOLS.length);
  });

  it("keep every MCP tool name within the client's limit", () => {
    const tooLong = names.filter((name) => `code_graphify_${name?.replaceAll(":", "_")}`.length > MAX_NAME_LENGTH);

    expect(tooLong).toEqual([]);
  });

  it("file a few tools where their object says", () => {
    expect(nameUpstreamTool(naming, "get_community")).toBe("graph:communities:get");
    expect(nameUpstreamTool(naming, "get_section")).toBe("graph:sections:get");
    expect(nameUpstreamTool(naming, "triage_prs")).toBe("prs:prs:triage");
    expect(nameUpstreamTool(naming, "something_new")).toBeUndefined();
  });
});
