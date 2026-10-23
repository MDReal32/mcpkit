import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypeScreenSchemesGetIssueTypeScreenSchemeMappings = defineTool({
  name: "workflows:issue_type_screen_schemes:get_issue_type_screen_scheme_mappings",
  description: "Get issue type screen scheme items. Returns a paginated list of issue type screen scheme items.",
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
      issueTypeScreenSchemeId: {
        type: "string",
        description:
          "The list of issue type screen scheme IDs. To include multiple issue type screen schemes, separate IDs with ampersand: `issueTypeScreenSchemeId=10000&issueTypeScreenSchemeId=10001`. (comma-separated)",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issuetypescreenscheme/mapping",
    query: ["startAt", "maxResults", "issueTypeScreenSchemeId"],
  },
});
