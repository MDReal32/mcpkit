import { defineTool } from "@usemcpkit/core";

export const projectsProjectsListProjectsTransferLocations = defineTool({
  name: "projects:projects:list_projects_transfer_locations",
  description:
    "List all transferable namespaces for a project. Lists all namespaces where a specified project can be transferred.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      search: {
        type: "string",
        description: "Group name to search for.",
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
    path: "/projects/{id}/transfer_locations",
    query: ["search", "page", "per_page"],
  },
});
