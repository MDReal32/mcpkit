import { defineTool } from "@usemcpkit/core";

export const usersUsersGetByUsername = defineTool({
  name: "users:users:get_by_username",
  description: "Get a user. Provides publicly available information about someone with a GitHub account.",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
    },
    required: ["username"],
  },
  request: {
    method: "GET",
    path: "/users/{username}",
  },
});
