import { defineTool } from "@usemcpkit/core";

export const projectsProjectsListProjectsUploads = defineTool({
  name: "projects:projects:list_projects_uploads",
  description:
    "List all uploads. Lists all uploads of a project sorted by `created_at` in descending order. You must have the Maintainer or Owner role for the project.",
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
    path: "/projects/{id}/uploads",
    query: ["page", "per_page"],
  },
});
