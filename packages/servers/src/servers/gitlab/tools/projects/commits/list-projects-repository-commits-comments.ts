import { defineTool } from "@usemcpkit/core";

export const projectsCommitsListProjectsRepositoryCommitsComments = defineTool({
  name: "projects:commits:list_projects_repository_commits_comments",
  description: "List all commit comments. Lists all the comments of a commit in a project.",
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
    },
    required: ["id", "sha"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/commits/{sha}/comments",
    query: ["page", "per_page"],
  },
});
