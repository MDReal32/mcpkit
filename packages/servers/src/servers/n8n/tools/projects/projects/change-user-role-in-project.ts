import { defineTool } from "@usemcpkit/core";

export const projectsProjectsChangeUserRoleInProject = defineTool({
  name: "projects:projects:change_user_role_in_project",
  description: "Change a user's role in a project. Change a user's role in a project.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
      userId: {
        type: "string",
        description: "The ID of the user.",
      },
      role: {
        type: "string",
        description: "The role assigned to the user in the project.",
      },
    },
    required: ["projectId", "userId", "role"],
  },
  request: {
    method: "PATCH",
    path: "/projects/{projectId}/users/{userId}",
    body: ["role"],
  },
});
