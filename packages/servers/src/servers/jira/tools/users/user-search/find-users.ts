import { defineTool } from "@usemcpkit/core";

export const usersUserSearchFindUsers = defineTool({
  name: "users:user_search:find_users",
  description: "Find users. Returns a list of active users that match the search string and property.",
  input: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description:
          "A query string that is matched against user attributes ( `displayName`, and `emailAddress`) to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` or `property` is specified.",
      },
      username: {
        type: "string",
      },
      accountId: {
        type: "string",
        description:
          "A query string that is matched exactly against a user `accountId`. Required, unless `query` or `property` is specified.",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of filtered results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description: "The maximum number of items to return per page.",
      },
      property: {
        type: "string",
        description:
          'A query string used to search properties. Property keys are specified by path, so property keys containing dot (.) or equals (=) characters cannot be used. The query string cannot be specified using a JSON object. Example: To search for the value of `nested` from `{"something":{"nested":1,"other":2}}` use `thepropertykey.something.nested=1`. Required, unless `accountId` or `query` is specified.',
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/user/search",
    query: ["query", "username", "accountId", "startAt", "maxResults", "property"],
  },
});
