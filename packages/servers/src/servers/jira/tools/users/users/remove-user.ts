import { defineTool } from "@usemcpkit/core";

export const usersUsersRemoveUser = defineTool({
  name: "users:users:remove_user",
  description:
    "Delete user. Deletes a user. If the operation completes successfully then the user is removed from Jira's user base. This operation does not delete the user's Atlassian account.",
  input: {
    type: "object",
    properties: {
      accountId: {
        type: "string",
        description:
          "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
      },
      username: {
        type: "string",
        description: "This parameter is no longer available. See the deprecation notice for details.",
      },
      key: {
        type: "string",
        description: "This parameter is no longer available. See the deprecation notice for details.",
      },
    },
    required: ["accountId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/user",
    query: ["accountId", "username", "key"],
  },
});
