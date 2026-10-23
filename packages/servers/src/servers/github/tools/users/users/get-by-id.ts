import { defineTool } from "@usemcpkit/core";

export const usersUsersGetById = defineTool({
  name: "users:users:get_by_id",
  description:
    "Get a user using their ID. Provides publicly available information about someone with a GitHub account. This method takes their durable user `ID` instead of their `login`, which can change over time.",
  input: {
    type: "object",
    properties: {
      account_id: {
        type: "integer",
        description: "account_id parameter",
      },
    },
    required: ["account_id"],
  },
  request: {
    method: "GET",
    path: "/user/{account_id}",
  },
});
