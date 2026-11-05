import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsGetWorkflow = defineTool({
  name: "workflows:workflows:get_workflow",
  description: "Retrieve a workflow. Retrieve a workflow.",
  input: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
        description: "The ID of the workflow.",
      },
      excludePinnedData: {
        type: "string",
        default: "false",
        enum: ["true", "false"],
      },
    },
    required: ["workflowId"],
  },
  request: {
    method: "GET",
    path: "/workflows/{workflowId}",
    query: ["excludePinnedData"],
  },
});
