import { defineTool } from "@usemcpkit/core";

export const usersUsersUpdateMyUser = defineTool({
  name: "users:users:update_my_user",
  description: "",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
      },
      avatar: {
        type: "string",
      },
      banner: {
        type: "string",
      },
    },
    required: ["username"],
  },
  request: {
    method: "PATCH",
    path: "/users/@me",
    body: ["username", "avatar", "banner"],
  },
});
