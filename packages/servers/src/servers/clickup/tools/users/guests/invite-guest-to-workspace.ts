import { defineTool } from "@usemcpkit/core";

export const usersGuestsInviteGuestToWorkspace = defineTool({
  name: "users:guests:invite_guest_to_workspace",
  description:
    "Invite Guest To Workspace. Invite a guest to join a Workspace. To invite a member to your Workspace, use the Invite User to Workspace endpoint. \\ \\ You'll also need to grant the guest access to specific items using the following endpoints: Add Guest to Folder, Add Guest to List, or Add Guest to Task. \\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
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
      can_edit_tags: {
        type: "boolean",
      },
      can_see_time_spent: {
        type: "boolean",
      },
      can_see_time_estimated: {
        type: "boolean",
      },
      can_create_views: {
        type: "boolean",
      },
      can_see_points_estimated: {
        type: "boolean",
      },
      custom_role_id: {
        type: "integer",
      },
    },
    required: ["team_id", "email"],
  },
  request: {
    method: "POST",
    path: "/v2/team/{team_id}/guest",
    body: [
      "email",
      "can_edit_tags",
      "can_see_time_spent",
      "can_see_time_estimated",
      "can_create_views",
      "can_see_points_estimated",
      "custom_role_id",
    ],
  },
});
