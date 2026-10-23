import { defineTool } from "@usemcpkit/core";

export const usersSearchIssuesAndPullRequests = defineTool({
  name: "users:search:issues_and_pull_requests",
  description:
    "Search issues and pull requests. Find issues by state and keyword. This method returns up to 100 results per page.",
  input: {
    type: "object",
    properties: {
      q: {
        type: "string",
        description:
          'The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See "Searching issues and pull requests" for a detailed list of qualifiers.',
      },
      sort: {
        type: "string",
        enum: [
          "comments",
          "reactions",
          "reactions-+1",
          "reactions--1",
          "reactions-smile",
          "reactions-thinking_face",
          "reactions-heart",
          "reactions-tada",
          "interactions",
          "created",
          "updated",
        ],
        description:
          "Sorts the results of your query by the number of `comments`, `reactions`, `reactions-+1`, `reactions--1`, `reactions-smile`, `reactions-thinking_face`, `reactions-heart`, `reactions-tada`, or `interactions`. You can also sort results by how recently the items were `created` or `updated`, Default: best match",
      },
      order: {
        type: "string",
        default: "desc",
        enum: ["desc", "asc"],
        description:
          "Determines whether the first search result returned is the highest number of matches (`desc`) or lowest number of matches (`asc`). This parameter is ignored unless you provide `sort`.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      advanced_search: {
        type: "string",
        description:
          "Set to `true` to use advanced search. Example: `http://api.github.com/search/issues?q={query}&advanced_search=true`",
      },
      search_type: {
        type: "string",
        enum: ["semantic", "hybrid"],
        description: "The type of search to perform on issues. When not specified, the default is lexical search.",
      },
    },
    required: ["q"],
  },
  request: {
    method: "GET",
    path: "/search/issues",
    query: ["q", "sort", "order", "per_page", "page", "advanced_search", "search_type"],
  },
});
