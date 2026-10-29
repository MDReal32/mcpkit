import { defineTool } from "@usemcpkit/core";

export const usersUsersGetUser = defineTool({
  name: "users:users:get_user",
  description:
    "Get User. View information about a user in a Workspace. \\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
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
      include_shared: {
        type: "boolean",
        description:
          "Exclude details of items shared with the guest by setting this parameter to `false`. By default this parameter is set to `true`.",
      },
    },
    required: ["team_id", "user_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/user/{user_id}",
    query: ["include_shared"],
  },
});
