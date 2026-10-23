import { defineTool } from "@usemcpkit/core";

export const ciEnvironmentsListProjectsEnvironments = defineTool({
  name: "ci:environments:list_projects_environments",
  description: "List all environments. Lists all environments for a specified project.",
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
      name: {
        type: "string",
        description: "Return the environment with this name. Mutually exclusive with `search`.",
      },
      search: {
        type: "string",
        description:
          "Return list of environments matching the search criteria. Must be at least 3 characters. Mutually exclusive with `name`.",
      },
      states: {
        type: "string",
        enum: ["stopped", "stopping", "available"],
        description: "Filter environments by state. If omitted, returns all environments.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/environments",
    query: ["page", "per_page", "name", "search", "states"],
  },
});
