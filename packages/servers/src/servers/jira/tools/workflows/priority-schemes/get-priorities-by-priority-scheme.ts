import { defineTool } from "@usemcpkit/core";

export const workflowsPrioritySchemesGetPrioritiesByPriorityScheme = defineTool({
  name: "workflows:priority_schemes:get_priorities_by_priority_scheme",
  description: "Get priorities by priority scheme. Returns a paginated list of priorities by scheme.",
  input: {
    type: "object",
    properties: {
      schemeId: {
        type: "string",
        description: "The priority scheme ID.",
      },
      startAt: {
        type: "string",
        default: "0",
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "string",
        default: "50",
        description: "The maximum number of items to return per page.",
      },
    },
    required: ["schemeId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/priorityscheme/{schemeId}/priorities",
    query: ["startAt", "maxResults"],
  },
});
