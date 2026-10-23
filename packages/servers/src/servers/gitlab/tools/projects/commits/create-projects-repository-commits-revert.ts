import { defineTool } from "@usemcpkit/core";

export const projectsCommitsCreateProjectsRepositoryCommitsRevert = defineTool({
  name: "projects:commits:create_projects_repository_commits_revert",
  description: "Revert a commit. Reverts a commit in a specified branch.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      sha: {
        type: "string",
        description: "Commit SHA to revert.",
      },
      branch: {
        type: "string",
        description: "Name of the target branch.",
      },
      dry_run: {
        type: "boolean",
        description: "If `true`, does not commit any changes.",
        default: false,
      },
    },
    required: ["id", "sha", "branch"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/repository/commits/{sha}/revert",
    body: ["branch", "dry_run"],
  },
});
