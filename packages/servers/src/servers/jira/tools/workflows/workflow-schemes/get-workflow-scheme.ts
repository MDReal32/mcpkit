import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemesGetWorkflowScheme = defineTool({
  name: "workflows:workflow_schemes:get_workflow_scheme",
  description: "Get workflow scheme. Returns a workflow scheme.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description:
          "The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in the URL as `schemeId`. For example, *schemeId=10301*.",
      },
      returnDraftIfExists: {
        type: "boolean",
        default: false,
        description:
          "Returns the workflow scheme's draft rather than scheme itself, if set to true. If the workflow scheme does not have a draft, then the workflow scheme is returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/workflowscheme/{id}",
    query: ["returnDraftIfExists"],
  },
});
