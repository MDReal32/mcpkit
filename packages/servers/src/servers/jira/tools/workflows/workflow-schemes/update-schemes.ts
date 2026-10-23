import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemesUpdateSchemes = defineTool({
  name: "workflows:workflow_schemes:update_schemes",
  description:
    "Update workflow scheme. Updates company-managed and team-managed project workflow schemes. This API doesn't have a concept of draft, so any changes made to a workflow scheme are immediately available. When changing the available statuses for issue types, an asynchronous task migrates the issues as defined in the provided mappings.",
  input: {
    type: "object",
    properties: {
      defaultWorkflowId: {
        type: "string",
        description:
          "The ID of the workflow for issue types without having a mapping defined in this workflow scheme. Only used in global-scoped workflow schemes. If the `defaultWorkflowId` isn't specified, this is set to *Jira Workflow (jira)*.",
      },
      description: {
        type: "string",
        description: "The new description for this workflow scheme.",
      },
      id: {
        type: "string",
        description: "The ID of this workflow scheme.",
      },
      name: {
        type: "string",
        description: "The new name for this workflow scheme.",
      },
      statusMappingsByIssueTypeOverride: {
        type: "array",
        description:
          "Overrides, for the selected issue types, any status mappings provided in `statusMappingsByWorkflows`. Status mappings are required when the new workflow for an issue type doesn't contain all statuses that the old workflow has. Status mappings can be provided by a combination of `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`.",
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
      statusMappingsByWorkflows: {
        type: "array",
        description:
          "The status mappings by workflows. Status mappings are required when the new workflow for an issue type doesn't contain all statuses that the old workflow has. Status mappings can be provided by a combination of `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`.",
        items: {
          type: "object",
          description:
            "The status mappings by workflows. Status mappings are required when the new workflow for an issue type doesn't contain all statuses that the old workflow has. Status mappings can be provided by a combination of `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`.",
          properties: {
            newWorkflowId: {
              type: "string",
              description: "The ID of the new workflow.",
            },
            oldWorkflowId: {
              type: "string",
              description: "The ID of the old workflow.",
            },
            statusMappings: {
              type: "array",
              description: "The list of status mappings.",
              items: {
                type: "object",
              },
            },
          },
          required: ["newWorkflowId", "oldWorkflowId", "statusMappings"],
        },
      },
      version: {
        type: "object",
        description: "The current version details of this workflow scheme.",
        properties: {
          id: {
            type: "string",
            description: "The version UUID.",
          },
          versionNumber: {
            type: "integer",
            description: "The version number.",
          },
        },
      },
      workflowsForIssueTypes: {
        type: "array",
        description: "Mappings from workflows to issue types.",
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
    required: ["description", "id", "name", "version"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/workflowscheme/update",
    body: [
      "defaultWorkflowId",
      "description",
      "id",
      "name",
      "statusMappingsByIssueTypeOverride",
      "statusMappingsByWorkflows",
      "version",
      "workflowsForIssueTypes",
    ],
  },
});
