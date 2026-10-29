import { defineTool } from "@usemcpkit/core";

export const usersUsersInviteUserToWorkspace = defineTool({
  name: "users:users:invite_user_to_workspace",
  description:
    "Invite User To Workspace. Invite someone to join your Workspace as a member. To invite someone as a guest, use the Invite Guest endpoint.\\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      email: {
        type: "string",
      },
      admin: {
        type: "boolean",
      },
      custom_role_id: {
        type: "integer",
      },
    },
    required: ["team_id", "email", "admin"],
  },
  request: {
    method: "POST",
    path: "/v2/team/{team_id}/user",
    body: ["email", "admin", "custom_role_id"],
  },
});
