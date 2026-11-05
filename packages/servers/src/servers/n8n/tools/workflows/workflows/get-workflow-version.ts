import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsGetWorkflowVersion = defineTool({
  name: "workflows:workflows:get_workflow_version",
  description: "Retrieve a workflow version. Retrieve a single version of a workflow from its version history.",
  input: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
        description: "The ID of the workflow.",
      },
      workflowVersionId: {
        type: "string",
        description: "The ID of the workflow version.",
      },
    },
    required: ["workflowId", "workflowVersionId"],
  },
  request: {
    method: "GET",
    path: "/workflows/{workflowId}/versions/{workflowVersionId}",
  },
});
