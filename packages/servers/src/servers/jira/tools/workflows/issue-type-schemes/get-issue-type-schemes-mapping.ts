import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypeSchemesGetIssueTypeSchemesMapping = defineTool({
  name: "workflows:issue_type_schemes:get_issue_type_schemes_mapping",
  description: "Get issue type scheme items. Returns a paginated list of issue type scheme items.",
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
      issueTypeSchemeId: {
        type: "string",
        description:
          "The list of issue type scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `issueTypeSchemeId=10000&issueTypeSchemeId=10001`. (comma-separated)",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issuetypescheme/mapping",
    query: ["startAt", "maxResults", "issueTypeSchemeId"],
  },
});
