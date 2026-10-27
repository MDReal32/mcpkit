import { defineTool } from "@usemcpkit/core";

export const usersGuestsEditGuestOnWorkspace = defineTool({
  name: "users:guests:edit_guest_on_workspace",
  description:
    "Edit Guest On Workspace. Configure options for a guest. \\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      guest_id: {
        type: "number",
      },
      can_see_points_estimated: {
        type: "boolean",
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
      custom_role_id: {
        type: "integer",
      },
    },
    required: ["team_id", "guest_id"],
  },
  request: {
    method: "PUT",
    path: "/v2/team/{team_id}/guest/{guest_id}",
    body: [
      "can_see_points_estimated",
      "can_edit_tags",
      "can_see_time_spent",
      "can_see_time_estimated",
      "can_create_views",
      "custom_role_id",
    ],
  },
});
