import { defineTool } from "@usemcpkit/core";

export const projectsRepositoriesListProjectsRepositoryChangedPaths = defineTool({
  name: "projects:repositories:list_projects_repository_changed_paths",
  description:
    "List files changed between two commits. Returns the path, change status, and file modes for every path that differs between two refs.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      from: {
        type: "string",
        description: "The commit SHA or branch/tag to compare from",
      },
      to: {
        type: "string",
        description: "The commit SHA or branch/tag to compare to",
      },
      find_renames: {
        type: "boolean",
        default: false,
        description: "If true, detect file renames",
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
    required: ["id", "from", "to"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/changed_paths",
    query: ["from", "to", "find_renames", "page", "per_page"],
  },
});
