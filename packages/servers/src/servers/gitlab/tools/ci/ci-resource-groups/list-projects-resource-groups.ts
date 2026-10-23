import { defineTool } from "@usemcpkit/core";

export const ciCiResourceGroupsListProjectsResourceGroups = defineTool({
  name: "ci:ci_resource_groups:list_projects_resource_groups",
  description: "List all resource groups. Lists all resource groups for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
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
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/resource_groups",
    query: ["page", "per_page"],
  },
});
