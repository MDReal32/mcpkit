import { defineTool } from "@usemcpkit/core";

export const projectsProjectsAddUsersToProject = defineTool({
  name: "projects:projects:add_users_to_project",
  description: "Add one or more users to a project. Add one or more users to a project on your instance.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
      relations: {
        type: "array",
        description: "A list of userIds and roles to add to the project.",
        items: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              description: "The unique identifier of the user.",
            },
            role: {
              type: "string",
              description: "The role assigned to the user in the project.",
            },
          },
          required: ["userId", "role"],
        },
      },
    },
    required: ["projectId", "relations"],
  },
  request: {
    method: "POST",
    path: "/projects/{projectId}/users",
    body: ["relations"],
  },
});
