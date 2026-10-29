import { defineTool } from "@usemcpkit/core";

export const usersUsersRemoveUserFromWorkspace = defineTool({
  name: "users:users:remove_user_from_workspace",
  description:
    "Remove User From Workspace. Deactivate a user from a Workspace. \\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
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
    },
    required: ["team_id", "user_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/team/{team_id}/user/{user_id}",
  },
});
