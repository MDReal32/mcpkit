import { defineTool } from "@usemcpkit/core";

export const usersUsersGetUser = defineTool({
  name: "users:users:get_user",
  description: "Get user by ID/Email. Retrieve a user from your instance. Only available for the instance owner.",
  input: {
    type: "object",
    properties: {
      userId: {
        type: "string",
        description: "The ID or email of the user.",
      },
      includeRole: {
        type: "string",
        default: "false",
        enum: ["true", "false"],
      },
    },
    required: ["userId"],
  },
  request: {
    method: "GET",
    path: "/users/{userId}",
    query: ["includeRole"],
  },
});
