import { defineTool } from "@usemcpkit/core";

export const projectsProtectedBranchesDeleteProjectsProtectedBranches = defineTool({
  name: "projects:protected_branches:delete_projects_protected_branches",
  description: "Unprotect repository branches. Unprotects a specified protected branch or wildcard protected branch.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "Name of the branch or wildcard.",
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/protected_branches/{name}",
  },
});
