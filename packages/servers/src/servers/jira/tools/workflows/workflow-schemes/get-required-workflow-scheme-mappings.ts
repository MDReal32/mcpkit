import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemesGetRequiredWorkflowSchemeMappings = defineTool({
  name: "workflows:workflow_schemes:get_required_workflow_scheme_mappings",
  description:
    "Get required status mappings for workflow scheme update. Gets the required status mappings for the desired changes to a workflow scheme. The results are provided per issue type and workflow. When updating a workflow scheme, status mappings can be provided per issue type, per workflow, or both.",
  input: {
    type: "object",
    properties: {
      defaultWorkflowId: {
        type: "string",
        description:
          "The ID of the new default workflow for this workflow scheme. Only used in global-scoped workflow schemes. If it isn't specified, is set to *Jira Workflow (jira)*.",
      },
      id: {
        type: "string",
        description: "The ID of the workflow scheme.",
      },
      workflowsForIssueTypes: {
        type: "array",
        description: "The new workflow to issue type mappings for this workflow scheme.",
        items: {
          type: "object",
          description: "The explicit association between issue types and a workflow in a workflow scheme.",
          properties: {
            issueTypeIds: {
              type: "array",
              description: "The issue types assigned to the workflow.",
              items: {
                type: "string",
                description: "The issue types assigned to the workflow.",
              },
            },
            workflowId: {
              type: "string",
              description: "The ID of the workflow.",
            },
          },
          required: ["issueTypeIds", "workflowId"],
        },
      },
    },
    required: ["id", "workflowsForIssueTypes"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/workflowscheme/update/mappings",
    body: ["defaultWorkflowId", "id", "workflowsForIssueTypes"],
  },
});
