import { defineServer } from "@usemcpkit/core";
import { GRAPHIFY_NAMING, GRAPHIFY_PACKAGE } from "./const";

export const graphify = defineServer({
  name: "graphify",
  category: "code",
  version: "1.0.0",
  description:
    "Graphify (github.com/Graphify-Labs/graphify): a knowledge graph of a codebase, read through Graphify's own MCP server, which uv installs on first use and runs locally on a Python that uv installs for it (the system Python is never used). Search the graph by question, read a node, its neighbors or a section, a community, the most connected nodes, the shortest path between two nodes and the graph's stats, plus pull request tools (list, impact on the graph, triage) that call the GitHub CLI (`gh`) with its own sign-in. It reads graphify-out/graph.json, which `graphify extract .` (or the /graphify skill) builds in the project: by default the one in the folder the client started usemcpkit in, and for any other project pass project_path, the absolute path of a folder that holds graphify-out/graph.json. Needs uv on PATH. It only reads the graph and logs queries to ~/.cache/graphify-queries.log; nothing is sent anywhere.",
  baseUrl: "https://graphify.com",
  upstream: {
    type: "stdio",
    command: "uv",
    args: ["tool", "run", "--managed-python", "--from", GRAPHIFY_PACKAGE, "graphify-mcp"],
    naming: GRAPHIFY_NAMING,
  },
  tools: [],
});
