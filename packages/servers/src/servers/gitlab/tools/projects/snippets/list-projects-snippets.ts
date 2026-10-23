import { defineTool } from "@usemcpkit/core";

export const projectsSnippetsListProjectsSnippets = defineTool({
  name: "projects:snippets:list_projects_snippets",
  description: "List all snippets for a project. Lists all snippets for a specified project.",
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
    path: "/projects/{id}/snippets",
    query: ["page", "per_page"],
  },
});
