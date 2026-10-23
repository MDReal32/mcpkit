import { defineTool } from "@usemcpkit/core";

export const projectsBranchesUpdateProjectsRepositoryBranchesProtect = defineTool({
  name: "projects:branches:update_projects_repository_branches_protect",
  description:
    "Protect a single branch. Protects a single branch, or updates its protection if it is already protected. Only users with the Maintainer role can push or merge unless `developers_can_push` or `developers_can_merge` is `true`.",
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
      developers_can_push: {
        type: "boolean",
        description: "If `true`, allows developers to push to the branch.",
      },
      developers_can_merge: {
        type: "boolean",
        description: "If `true`, allows developers to merge to the branch.",
      },
    },
    required: ["id", "branch"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/repository/branches/{branch}/protect",
    body: ["developers_can_push", "developers_can_merge"],
  },
});
