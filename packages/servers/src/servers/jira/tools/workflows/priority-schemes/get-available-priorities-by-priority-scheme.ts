import { defineTool } from "@usemcpkit/core";

export const workflowsPrioritySchemesGetAvailablePrioritiesByPriorityScheme = defineTool({
  name: "workflows:priority_schemes:get_available_priorities_by_priority_scheme",
  description:
    "Get available priorities by priority scheme. Returns a paginated list of priorities available for adding to a priority scheme.",
  input: {
    type: "object",
    properties: {
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
      query: {
        type: "string",
        default: "",
        description: "The string to query priorities on by name.",
      },
      schemeId: {
        type: "string",
        description: "The priority scheme ID.",
      },
      exclude: {
        type: "string",
        description: "A list of priority IDs to exclude from the results. (comma-separated)",
      },
    },
    required: ["schemeId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/priorityscheme/priorities/available",
    query: ["startAt", "maxResults", "query", "schemeId", "exclude"],
  },
});
