import { defineTool } from "@usemcpkit/core";

export const cloudUsersBulkCreateBulkUserLookup = defineTool({
  name: "cloud:users_bulk:create_bulk_user_lookup",
  description:
    "[Cloud] Create bulk user lookup using ids. Returns user details for the ids provided in the request body.",
  input: {
    type: "object",
    properties: {
      accountIds: {
        type: "array",
        description: "List of accountIds to retrieve user info for.",
        items: {
          type: "string",
        },
      },
    },
    required: ["accountIds"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/users-bulk",
    body: ["accountIds"],
  },
});
