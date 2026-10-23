import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsReadWorkflowFromHistory = defineTool({
  name: "workflows:workflows:read_workflow_from_history",
  description:
    "Read workflow version from history. Returns a workflow and related statuses for a specified workflow id and version number.",
  input: {
    type: "object",
    properties: {
      version: {
        type: "integer",
      },
      workflowId: {
        type: "string",
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/workflow/history",
    body: ["version", "workflowId"],
  },
});
