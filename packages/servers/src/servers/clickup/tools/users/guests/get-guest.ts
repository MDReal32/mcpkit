import { defineTool } from "@usemcpkit/core";

export const usersGuestsGetGuest = defineTool({
  name: "users:guests:get_guest",
  description:
    "Get Guest. View information about a guest. \\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
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
    method: "GET",
    path: "/v2/team/{team_id}/guest/{guest_id}",
  },
});
