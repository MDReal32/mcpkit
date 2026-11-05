import { defineTool } from "@usemcpkit/core";

export const projectsProjectsDeleteUserFromProject = defineTool({
  name: "projects:projects:delete_user_from_project",
  description: "Delete a user from a project. Delete a user from a project on your instance.",
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
    },
    required: ["projectId", "userId"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{projectId}/users/{userId}",
  },
});
