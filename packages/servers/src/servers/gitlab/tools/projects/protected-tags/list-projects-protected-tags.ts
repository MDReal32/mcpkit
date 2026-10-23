import { defineTool } from "@usemcpkit/core";

export const projectsProtectedTagsListProjectsProtectedTags = defineTool({
  name: "projects:protected_tags:list_projects_protected_tags",
  description: "List all protected tags. Lists all protected tags for a specified project.",
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
    path: "/projects/{id}/protected_tags",
    query: ["page", "per_page"],
  },
});
