import { defineTool } from "@usemcpkit/core";

export const usersGuestsRemoveGuestFromWorkspace = defineTool({
  name: "users:guests:remove_guest_from_workspace",
  description:
    "Remove Guest From Workspace. Revoke a guest's access to a Workspace. \\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
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
    },
    required: ["team_id", "guest_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/team/{team_id}/guest/{guest_id}",
  },
});
