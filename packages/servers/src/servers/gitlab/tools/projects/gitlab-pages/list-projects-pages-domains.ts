import { defineTool } from "@usemcpkit/core";

export const projectsGitlabPagesListProjectsPagesDomains = defineTool({
  name: "projects:gitlab_pages:list_projects_pages_domains",
  description:
    "List all Pages domains in a project. Lists all Pages domains in a specified project. You must have permissions to view Pages domains.",
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
    path: "/projects/{id}/pages/domains",
    query: ["page", "per_page"],
  },
});
