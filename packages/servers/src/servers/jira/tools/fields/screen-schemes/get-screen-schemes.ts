import { defineTool } from "@usemcpkit/core";

export const fieldsScreenSchemesGetScreenSchemes = defineTool({
  name: "fields:screen_schemes:get_screen_schemes",
  description: "Get screen schemes. Returns a paginated list of screen schemes.",
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
        default: 25,
        description: "The maximum number of items to return per page.",
      },
      id: {
        type: "string",
        description:
          "The list of screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. (comma-separated)",
      },
      expand: {
        type: "string",
        default: "",
        description:
          "Use expand include additional information in the response. This parameter accepts `issueTypeScreenSchemes` that, for each screen schemes, returns information about the issue type screen scheme the screen scheme is assigned to.",
      },
      queryString: {
        type: "string",
        default: "",
        description: "String used to perform a case-insensitive partial match with screen scheme name.",
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
    path: "/rest/api/2/screenscheme",
    query: ["startAt", "maxResults", "id", "expand", "queryString", "orderBy"],
  },
});
