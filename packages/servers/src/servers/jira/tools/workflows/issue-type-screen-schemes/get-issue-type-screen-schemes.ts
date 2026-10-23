import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypeScreenSchemesGetIssueTypeScreenSchemes = defineTool({
  name: "workflows:issue_type_screen_schemes:get_issue_type_screen_schemes",
  description: "Get issue type screen schemes. Returns a paginated list of issue type screen schemes.",
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
        default: 50,
        description: "The maximum number of items to return per page.",
      },
      id: {
        type: "string",
        description:
          "The list of issue type screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. (comma-separated)",
      },
      queryString: {
        type: "string",
        default: "",
        description: "String used to perform a case-insensitive partial match with issue type screen scheme name.",
      },
      orderBy: {
        type: "string",
        default: "id",
        enum: ["name", "-name", "+name", "id", "-id", "+id"],
        description: "Order the results by a field:",
      },
      expand: {
        type: "string",
        default: "",
        description:
          "Use expand to include additional information in the response. This parameter accepts `projects` that, for each issue type screen schemes, returns information about the projects the issue type screen scheme is assigned to.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issuetypescreenscheme",
    query: ["startAt", "maxResults", "id", "queryString", "orderBy", "expand"],
  },
});
