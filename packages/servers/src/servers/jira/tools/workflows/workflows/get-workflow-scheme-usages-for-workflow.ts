import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsGetWorkflowSchemeUsagesForWorkflow = defineTool({
  name: "workflows:workflows:get_workflow_scheme_usages_for_workflow",
  description:
    "Get workflow schemes which are using a given workflow. Returns a page of workflow schemes using a given workflow.",
  input: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
        description: "The workflow ID",
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
    required: ["workflowId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/workflow/{workflowId}/workflowSchemes",
    query: ["nextPageToken", "maxResults"],
  },
});
