import { defineTool } from "@usemcpkit/core";

export const projectsCommitsListProjectsRepositoryCommitsMergeRequests = defineTool({
  name: "projects:commits:list_projects_repository_commits_merge_requests",
  description:
    "List all merge requests associated with a commit. Lists all merge requests associated with a specified commit.",
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
      state: {
        type: "string",
        description:
          "Filter merge requests by state: `opened`, `closed`, `locked`, or `merged`. If omitted, merge requests of all states are returned. Introduced in GitLab 18.2.",
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
    path: "/projects/{id}/repository/commits/{sha}/merge_requests",
    query: ["state", "page", "per_page"],
  },
});
