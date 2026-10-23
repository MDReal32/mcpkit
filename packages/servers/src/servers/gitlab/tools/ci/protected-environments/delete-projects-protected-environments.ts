import { defineTool } from "@usemcpkit/core";

export const ciProtectedEnvironmentsDeleteProjectsProtectedEnvironments = defineTool({
  name: "ci:protected_environments:delete_projects_protected_environments",
  description:
    "Unprotect a protected environment for a project. Unprotects a specified protected environment for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "Name of the protected environment.",
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/protected_environments/{name}",
  },
});
