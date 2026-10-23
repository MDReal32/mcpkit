import { defineTool } from "@usemcpkit/core";

export const aiOrbitListOrbitSkills = defineTool({
  name: "ai:orbit:list_orbit_skills",
  description:
    "List deployed Orbit skills. Lists the Orbit skills deployed with the connected knowledge graph service.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/orbit/skills",
  },
});
