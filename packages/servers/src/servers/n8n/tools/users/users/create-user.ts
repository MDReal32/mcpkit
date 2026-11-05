import { defineTool } from "@usemcpkit/core";

export const usersUsersCreateUser = defineTool({
  name: "users:users:create_user",
  description: "Create multiple users. Create one or more users.",
  input: {
    type: "object",
    properties: {
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            email: {
              type: "string",
            },
            role: {
              type: "string",
              default: "global:member",
            },
          },
          required: ["email"],
        },
      },
    },
    required: ["body"],
  },
  request: {
    method: "POST",
    path: "/users",
    bodyArg: "body",
  },
});
