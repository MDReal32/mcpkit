import { defineTool } from "@usemcpkit/core";

export const aiOrbitListOrbitQueryTemplates = defineTool({
  name: "ai:orbit:list_orbit_query_templates",
  description:
    "List named query templates. Lists the server-defined named queries with their query DSL rendered for the current user.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/orbit/query/templates",
  },
});
