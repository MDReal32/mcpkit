import { defineTool } from "@usemcpkit/core";

export const usersGistsListStarred = defineTool({
  name: "users:gists:list_starred",
  description: "List starred gists. List the authenticated user's starred gists:",
  input: {
    type: "object",
    properties: {
      since: {
        type: "string",
        description:
          "Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.",
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
    },
  },
  request: {
    method: "GET",
    path: "/gists/starred",
    query: ["since", "per_page", "page"],
  },
});
