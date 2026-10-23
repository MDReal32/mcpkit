import { defineTool } from "@usemcpkit/core";

export const usersUsersGetUserPreferences = defineTool({
  name: "users:users:get_user_preferences",
  description: "Retrieve your user preferences. Retrieves your user preferences.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/user/preferences",
  },
});
