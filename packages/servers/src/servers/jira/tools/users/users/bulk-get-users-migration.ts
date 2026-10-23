import { defineTool } from "@usemcpkit/core";

export const usersUsersBulkGetUsersMigration = defineTool({
  name: "users:users:bulk_get_users_migration",
  description:
    "Get account IDs for users. Returns the account IDs for the users specified in the `key` or `username` parameters. Note that multiple `key` or `username` parameters can be specified.",
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
          "Username of a user. To specify multiple users, pass multiple copies of this parameter. For example, `username=fred&username=barney`. Required if `key` isn't provided. Cannot be provided if `key` is present. (comma-separated)",
      },
      key: {
        type: "string",
        description:
          "Key of a user. To specify multiple users, pass multiple copies of this parameter. For example, `key=fred&key=barney`. Required if `username` isn't provided. Cannot be provided if `username` is present. (comma-separated)",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/user/bulk/migration",
    query: ["startAt", "maxResults", "username", "key"],
  },
});
