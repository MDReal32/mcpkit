import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsListProjectsRepositoryCommitsDiscussions = defineTool({
  name: "issues:discussions:list_projects_repository_commits_discussions",
  description: "List all discussions for a commit. Lists all discussions for a specified commit.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      noteable_id: {
        type: "string",
        description: "ID of the commit.",
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
    required: ["id", "noteable_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/commits/{noteable_id}/discussions",
    query: ["page", "per_page"],
  },
});
