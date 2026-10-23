import { defineTool } from "@usemcpkit/core";

export const projectsCommitsListProjectsRepositoryCommitsDiff = defineTool({
  name: "projects:commits:list_projects_repository_commits_diff",
  description: "Retrieve a commit diff. Retrieves the diff of a commit in a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      sha: {
        type: "string",
        description: "Commit SHA or name of a repository branch or tag.",
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
      unidiff: {
        type: "boolean",
        default: false,
        description: "If `true`, presents diffs in the unified diff format.",
      },
    },
    required: ["id", "sha"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/commits/{sha}/diff",
    query: ["page", "per_page", "unidiff"],
  },
});
