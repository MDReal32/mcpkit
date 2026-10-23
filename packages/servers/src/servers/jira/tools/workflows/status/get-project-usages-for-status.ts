import { defineTool } from "@usemcpkit/core";

export const workflowsStatusGetProjectUsagesForStatus = defineTool({
  name: "workflows:status:get_project_usages_for_status",
  description: "Get project usages by status. Returns a page of projects using a given status.",
  input: {
    type: "object",
    properties: {
      statusId: {
        type: "string",
        description: "The statusId to fetch project usages for",
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
    path: "/rest/api/2/statuses/{statusId}/projectUsages",
    query: ["nextPageToken", "maxResults"],
  },
});
