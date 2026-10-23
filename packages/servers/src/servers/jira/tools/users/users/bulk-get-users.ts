import { defineTool } from "@usemcpkit/core";

export const usersUsersBulkGetUsers = defineTool({
  name: "users:users:bulk_get_users",
  description: "Bulk get users. Returns a paginated list of the users specified by one or more account IDs.",
  input: {
    type: "object",
    properties: {
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 10,
        description: "The maximum number of items to return per page.",
      },
      username: {
        type: "string",
        description:
          "This parameter is no longer available and will be removed from the documentation soon. See the deprecation notice for details. (comma-separated)",
      },
      key: {
        type: "string",
        description:
          "This parameter is no longer available and will be removed from the documentation soon. See the deprecation notice for details. (comma-separated)",
      },
      accountId: {
        type: "string",
        description:
          "The account ID of a user. To specify multiple users, pass multiple `accountId` parameters. For example, `accountId=5b10a2844c20165700ede21g&accountId=5b10ac8d82e05b22cc7d4ef5`. (comma-separated)",
      },
    },
    required: ["accountId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/user/bulk",
    query: ["startAt", "maxResults", "username", "key", "accountId"],
  },
});
