import { defineTool } from "@usemcpkit/core";

export const usersUserSearchFindUsersByQuery = defineTool({
  name: "users:user_search:find_users_by_query",
  description: "Find users by query. Finds users with a structured query and returns a paginated list of user details.",
  input: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The search query.",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 100,
        description: "The maximum number of items to return per page.",
      },
    },
    required: ["query"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/user/search/query",
    query: ["query", "startAt", "maxResults"],
  },
});
