import { defineTool } from "@usemcpkit/core";

export const usersUserSearchFindAssignableUsers = defineTool({
  name: "users:user_search:find_assignable_users",
  description:
    "Find users assignable to issues. Returns a list of users that can be assigned to an issue. Use this operation to find the list of users who can be assigned to:",
  input: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description:
          "A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `username` or `accountId` is specified.",
      },
      sessionId: {
        type: "string",
        description: "The sessionId of this request. SessionId is the same until the assignee is set.",
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
      project: {
        type: "string",
        description:
          "The project ID or project key (case sensitive). Required, unless `issueKey` or `issueId` is specified.",
      },
      issueKey: {
        type: "string",
        description: "The key of the issue. Required, unless `issueId` or `project` is specified.",
      },
      issueId: {
        type: "string",
        description: "The ID of the issue. Required, unless `issueKey` or `project` is specified.",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description:
          "The maximum number of items to return. This operation may return less than the maximum number of items even if more are available. The operation fetches users up to the maximum and then, from the fetched users, returns only the users that can be assigned to the issue.",
      },
      actionDescriptorId: {
        type: "integer",
        description: "The ID of the transition.",
      },
      recommend: {
        type: "boolean",
        default: false,
      },
      accountType: {
        type: "string",
        description: "(comma-separated)",
      },
      appType: {
        type: "string",
        description: "(comma-separated)",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/user/assignable/search",
    query: [
      "query",
      "sessionId",
      "username",
      "accountId",
      "project",
      "issueKey",
      "issueId",
      "startAt",
      "maxResults",
      "actionDescriptorId",
      "recommend",
      "accountType",
      "appType",
    ],
  },
});
