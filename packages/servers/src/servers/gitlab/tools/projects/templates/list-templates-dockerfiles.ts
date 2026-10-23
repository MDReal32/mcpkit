import { defineTool } from "@usemcpkit/core";

export const projectsTemplatesListTemplatesDockerfiles = defineTool({
  name: "projects:templates:list_templates_dockerfiles",
  description: "List all Dockerfile templates. Lists all Dockerfile templates.",
  input: {
    type: "object",
    properties: {
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/templates/dockerfiles",
    query: ["page", "per_page"],
  },
});
