import { defineTool } from "@usemcpkit/core";

export const usersUsersEditUserOnWorkspace = defineTool({
  name: "users:users:edit_user_on_workspace",
  description:
    "Edit User On Workspace. Update a user's name and role. \\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      user_id: {
        type: "number",
      },
      username: {
        type: "string",
      },
      admin: {
        type: "boolean",
      },
      custom_role_id: {
        type: "integer",
      },
    },
    required: ["team_id", "user_id", "username", "admin", "custom_role_id"],
  },
  request: {
    method: "PUT",
    path: "/v2/team/{team_id}/user/{user_id}",
    body: ["username", "admin", "custom_role_id"],
  },
});
