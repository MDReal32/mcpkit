import { defineTool } from "@usemcpkit/core";

export const projectsBranchesDeleteProjectsRepositoryMergedBranches = defineTool({
  name: "projects:branches:delete_projects_repository_merged_branches",
  description:
    "Delete all merged branches. Deletes all branches that are merged into the default branch for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/repository/merged_branches",
  },
});
