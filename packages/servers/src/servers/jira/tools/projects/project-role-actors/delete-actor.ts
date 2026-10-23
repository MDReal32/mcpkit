import { defineTool } from "@usemcpkit/core";

export const projectsProjectRoleActorsDeleteActor = defineTool({
  name: "projects:project_role_actors:delete_actor",
  description: "Delete actors from project role. Deletes actors from a project role for the project.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
      id: {
        type: "integer",
        description: "The ID of the project role. Use Get all project roles to get a list of project role IDs.",
      },
      user: {
        type: "string",
        description: "The user account ID of the user to remove from the project role.",
      },
      group: {
        type: "string",
        description:
          "The name of the group to remove from the project role. This parameter cannot be used with the `groupId` parameter. As a group's name can change, use of `groupId` is recommended.",
      },
      groupId: {
        type: "string",
        description:
          "The ID of the group to remove from the project role. This parameter cannot be used with the `group` parameter.",
      },
    },
    required: ["projectIdOrKey", "id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/project/{projectIdOrKey}/role/{id}",
    query: ["user", "group", "groupId"],
  },
});
