import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemesGetDefaultWorkflow = defineTool({
  name: "workflows:workflow_schemes:get_default_workflow",
  description:
    "Get default workflow. Returns the default workflow for a workflow scheme. The default workflow is the workflow that is assigned any issue types that have not been mapped to any other workflow. The default workflow has *All Unassigned Issue Types* listed in its issue types for the workflow scheme in Jira.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the workflow scheme.",
      },
      returnDraftIfExists: {
        type: "boolean",
        default: false,
        description:
          "Set to `true` to return the default workflow for the workflow scheme's draft rather than scheme itself. If the workflow scheme does not have a draft, then the default workflow for the workflow scheme is returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/workflowscheme/{id}/default",
    query: ["returnDraftIfExists"],
  },
});
