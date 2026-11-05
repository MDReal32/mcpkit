import { defineTool } from "@usemcpkit/core";

export const usersUsersGetMe = defineTool({
  name: "users:users:get_me",
  description: "Get current user. Returns the user information for the currently authenticated user.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/v1/me",
  },
});
