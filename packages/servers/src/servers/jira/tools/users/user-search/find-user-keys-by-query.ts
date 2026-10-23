import { defineTool } from "@usemcpkit/core";

export const usersUserSearchFindUserKeysByQuery = defineTool({
  name: "users:user_search:find_user_keys_by_query",
  description:
    "Find user keys by query. Finds users with a structured query and returns a paginated list of user keys.",
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
      maxResult: {
        type: "integer",
        default: 100,
        description: "The maximum number of items to return per page.",
      },
    },
    required: ["query"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/user/search/query/key",
    query: ["query", "startAt", "maxResult"],
  },
});
