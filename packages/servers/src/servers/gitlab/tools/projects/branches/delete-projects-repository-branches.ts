import { defineTool } from "@usemcpkit/core";

export const projectsBranchesDeleteProjectsRepositoryBranches = defineTool({
  name: "projects:branches:delete_projects_repository_branches",
  description: "Delete a repository branch. Deletes a specified branch from the repository.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      branch: {
        type: "string",
        description: "Name of the branch.",
      },
    },
    required: ["id", "branch"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/repository/branches/{branch}",
  },
});
