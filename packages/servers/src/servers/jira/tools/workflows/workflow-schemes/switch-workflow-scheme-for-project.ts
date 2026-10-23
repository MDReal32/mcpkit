import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemesSwitchWorkflowSchemeForProject = defineTool({
  name: "workflows:workflow_schemes:switch_workflow_scheme_for_project",
  description: "Switch workflow scheme for project. Switches a workflow scheme for a project.",
  input: {
    type: "object",
    properties: {
      mappingsByIssueTypeOverride: {
        type: "array",
        description:
          "The mappings for migrating issues from old statuses to new statuses when switching from one workflow scheme to another. This field is required if any statuses in the current project's workflows would no longer exist in the target workflow scheme. Each mapping defines how to update issues from an old status to the corresponding new status in the issue’s new workflow.",
        items: {
          type: "object",
          description:
            "The mappings for migrating issues from old statuses to new statuses when switching from one workflow scheme to another. This field is required if any statuses in the current project's workflows would no longer exist in the target workflow scheme. Each mapping defines how to update issues from an old status to the corresponding new status in the issue’s new workflow.",
          properties: {
            issueTypeId: {
              type: "string",
            },
            statusMappings: {
              type: "array",
              items: {
                type: "object",
              },
            },
          },
        },
      },
      projectId: {
        type: "string",
        description: "The ID of the project to switch the workflow scheme for",
      },
      targetSchemeId: {
        type: "string",
        description: "The ID of the target workflow scheme to switch to",
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/workflowscheme/project/switch",
    body: ["mappingsByIssueTypeOverride", "projectId", "targetSchemeId"],
  },
});
