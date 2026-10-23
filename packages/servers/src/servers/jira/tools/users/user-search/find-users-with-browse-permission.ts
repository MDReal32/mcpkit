import { defineTool } from "@usemcpkit/core";

export const usersUserSearchFindUsersWithBrowsePermission = defineTool({
  name: "users:user_search:find_users_with_browse_permission",
  description: "Find users with browse permission. Returns a list of users who fulfill these criteria:",
  input: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description:
          "A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified.",
      },
      username: {
        type: "string",
        description: "This parameter is no longer available. See the deprecation notice for details.",
      },
      accountId: {
        type: "string",
        description:
          "A query string that is matched exactly against user `accountId`. Required, unless `query` is specified.",
      },
      issueKey: {
        type: "string",
        description: "The issue key for the issue. Required, unless `projectKey` is specified.",
      },
      projectKey: {
        type: "string",
        description: "The project key for the project (case sensitive). Required, unless `issueKey` is specified.",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description: "The maximum number of items to return per page.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/user/viewissue/search",
    query: ["query", "username", "accountId", "issueKey", "projectKey", "startAt", "maxResults"],
  },
});
