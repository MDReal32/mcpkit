import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowStatusesGetStatuses = defineTool({
  name: "workflows:workflow_statuses:get_statuses",
  description: "Get all statuses. Returns a list of all statuses associated with active workflows.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/status",
  },
});
