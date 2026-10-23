import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemesGetWorkflowSchemeIssueType = defineTool({
  name: "workflows:workflow_schemes:get_workflow_scheme_issue_type",
  description:
    "Get workflow for issue type in workflow scheme. Returns the issue type-workflow mapping for an issue type in a workflow scheme.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the workflow scheme.",
      },
      issueType: {
        type: "string",
        description: "The ID of the issue type.",
      },
      returnDraftIfExists: {
        type: "boolean",
        default: false,
        description:
          "Returns the mapping from the workflow scheme's draft rather than the workflow scheme, if set to true. If no draft exists, the mapping from the workflow scheme is returned.",
      },
    },
    required: ["id", "issueType"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/workflowscheme/{id}/issuetype/{issueType}",
    query: ["returnDraftIfExists"],
  },
});
