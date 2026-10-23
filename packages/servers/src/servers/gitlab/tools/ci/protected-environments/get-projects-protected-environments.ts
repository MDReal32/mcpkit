import { defineTool } from "@usemcpkit/core";

export const ciProtectedEnvironmentsGetProjectsProtectedEnvironments = defineTool({
  name: "ci:protected_environments:get_projects_protected_environments",
  description:
    "Retrieve a protected environment for a project. Retrieves a specified protected environment for a project.",
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
    method: "GET",
    path: "/projects/{id}/protected_environments/{name}",
  },
});
