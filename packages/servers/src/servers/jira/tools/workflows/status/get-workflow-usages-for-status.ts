import { defineTool } from "@usemcpkit/core";

export const workflowsStatusGetWorkflowUsagesForStatus = defineTool({
  name: "workflows:status:get_workflow_usages_for_status",
  description: "Get workflow usages by status. Returns a page of workflows using a given status.",
  input: {
    type: "object",
    properties: {
      statusId: {
        type: "string",
        description: "The statusId to fetch workflow usages for",
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
    required: ["statusId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/statuses/{statusId}/workflowUsages",
    query: ["nextPageToken", "maxResults"],
  },
});
