import { defineTool } from "@usemcpkit/core";

export const aiOrbitListOrbitTools = defineTool({
  name: "ai:orbit:list_orbit_tools",
  description: "List all tools. Lists all available Orbit operations.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/orbit/tools",
  },
});
