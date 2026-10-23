import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemesDeleteWorkflowScheme = defineTool({
  name: "workflows:workflow_schemes:delete_workflow_scheme",
  description:
    "Delete workflow scheme. Deletes a workflow scheme. Note that a workflow scheme cannot be deleted if it is active (that is, being used by at least one project).",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description:
          "The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in the URL as `schemeId`. For example, *schemeId=10301*.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/workflowscheme/{id}",
  },
});
