import { defineTool } from "@usemcpkit/core";

export const usersUsersGetMyUser = defineTool({
  name: "users:users:get_my_user",
  description: "",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/users/@me",
  },
});
