import { defineTool } from "@usemcpkit/core";

export const fieldsScreensGetScreens = defineTool({
  name: "fields:screens:get_screens",
  description: "Get screens. Returns a paginated list of all screens or those specified by one or more screen IDs.",
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
        default: 100,
        description: "The maximum number of items to return per page.",
      },
      id: {
        type: "string",
        description:
          "The list of screen IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. (comma-separated)",
      },
      queryString: {
        type: "string",
        default: "",
        description: "String used to perform a case-insensitive partial match with screen name.",
      },
      scope: {
        type: "string",
        description:
          "The scope filter string. To filter by multiple scope, provide an ampersand-separated list. For example, `scope=GLOBAL&scope=PROJECT`. (comma-separated)",
      },
      orderBy: {
        type: "string",
        enum: ["name", "-name", "+name", "id", "-id", "+id"],
        description: "Order the results by a field:",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/screens",
    query: ["startAt", "maxResults", "id", "queryString", "scope", "orderBy"],
  },
});
