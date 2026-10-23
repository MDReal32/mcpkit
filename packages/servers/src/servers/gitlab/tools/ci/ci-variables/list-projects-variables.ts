import { defineTool } from "@usemcpkit/core";

export const ciCiVariablesListProjectsVariables = defineTool({
  name: "ci:ci_variables:list_projects_variables",
  description:
    "List all project variables. Lists all variables for a project. Use the `page` and `per_page` pagination parameters to control the pagination of results.",
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
    path: "/projects/{id}/variables",
    query: ["page", "per_page"],
  },
});
