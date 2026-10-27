import { defineTool } from "@usemcpkit/core";

export const usersUserGroupsCreateGroup = defineTool({
  name: "users:user_groups:create_group",
  description:
    "Create Group. This endpoint creates a User Group within a Workspace.\\ \\ User Groups are used to organize and manage users within a Workspace.\\ \\ In the API documentation, `team_id` refers to the Workspace ID, and `group_id` refers to the User Group ID.\\ \\ **Note:** Adding a guest with view-only permissions to a Team automatically converts them to a paid guest.\\ \\ If no paid guest seats are available, an additi…",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      name: {
        type: "string",
      },
      handle: {
        type: "string",
      },
      members: {
        type: "array",
        items: {
          type: "integer",
        },
      },
    },
    required: ["team_id", "name", "members"],
  },
  request: {
    method: "POST",
    path: "/v2/team/{team_id}/group",
    body: ["name", "handle", "members"],
  },
});
