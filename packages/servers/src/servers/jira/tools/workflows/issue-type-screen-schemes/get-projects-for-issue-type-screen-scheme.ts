import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypeScreenSchemesGetProjectsForIssueTypeScreenScheme = defineTool({
  name: "workflows:issue_type_screen_schemes:get_projects_for_issue_type_screen_scheme",
  description:
    "Get issue type screen scheme projects. Returns a paginated list of projects associated with an issue type screen scheme.",
  input: {
    type: "object",
    properties: {
      issueTypeScreenSchemeId: {
        type: "integer",
        description: "The ID of the issue type screen scheme.",
      },
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
      query: {
        type: "string",
        default: "",
      },
    },
    required: ["issueTypeScreenSchemeId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issuetypescreenscheme/{issueTypeScreenSchemeId}/project",
    query: ["startAt", "maxResults", "query"],
  },
});
