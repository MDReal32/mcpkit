import { defineTool } from "@usemcpkit/core";

export const workflowsIssuePrioritiesGetPriorities = defineTool({
  name: "workflows:issue_priorities:get_priorities",
  description: "[Deprecated] Get priorities. Returns the list of all issue priorities.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/priority",
  },
});
