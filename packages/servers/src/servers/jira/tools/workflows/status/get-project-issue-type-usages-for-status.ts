import { defineTool } from "@usemcpkit/core";

export const workflowsStatusGetProjectIssueTypeUsagesForStatus = defineTool({
  name: "workflows:status:get_project_issue_type_usages_for_status",
  description:
    "Get issue type usages by status and project. Returns a page of issue types in a project using a given status.",
  input: {
    type: "object",
    properties: {
      statusId: {
        type: "string",
        description: "The statusId to fetch issue type usages for",
      },
      projectId: {
        type: "string",
        description: "The projectId to fetch issue type usages for",
      },
      nextPageToken: {
        type: "string",
        description: "The cursor for pagination",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description: "The maximum number of results to return. Must be an integer between 1 and 200.",
      },
    },
    required: ["statusId", "projectId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/statuses/{statusId}/project/{projectId}/issueTypeUsages",
    query: ["nextPageToken", "maxResults"],
  },
});
