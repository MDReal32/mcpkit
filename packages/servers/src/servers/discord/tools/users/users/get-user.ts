import { defineTool } from "@usemcpkit/core";

export const usersUsersGetUser = defineTool({
  name: "users:users:get_user",
  description: "",
  input: {
    type: "object",
    properties: {
      user_id: {
        type: "string",
      },
    },
    required: ["user_id"],
  },
  request: {
    method: "GET",
    path: "/users/{user_id}",
  },
});
