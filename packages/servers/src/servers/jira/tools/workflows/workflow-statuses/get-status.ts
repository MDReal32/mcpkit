import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowStatusesGetStatus = defineTool({
  name: "workflows:workflow_statuses:get_status",
  description: "Get status. Returns a status. The status must be associated with an active workflow to be returned.",
  input: {
    type: "object",
    properties: {
      idOrName: {
        type: "string",
        description: "The ID or name of the status.",
      },
    },
    required: ["idOrName"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/status/{idOrName}",
  },
});
