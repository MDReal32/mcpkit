import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsValidateCreateWorkflows = defineTool({
  name: "workflows:workflows:validate_create_workflows",
  description: "Validate create workflows. Validate the payload for bulk create workflows.",
  input: {
    type: "object",
    properties: {
      payload: {
        type: "object",
        description: "The create workflows payload.",
        properties: {
          scope: {
            type: "object",
            description: "The scope of the workflow.",
            properties: {
              project: {
                type: "object",
                description: "Project ID details.",
              },
              type: {
                type: "string",
                description:
                  "The scope of the workflow. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects.",
                enum: ["PROJECT", "GLOBAL"],
              },
            },
          },
          statuses: {
            type: "array",
            description: "The statuses to associate with the workflows.",
            items: {
              type: "object",
              description: "Details of the status being updated.",
            },
          },
          workflows: {
            type: "array",
            description: "The details of the workflows to create.",
            items: {
              type: "object",
              description: "The details of the workflows to create.",
            },
          },
        },
      },
      validationOptions: {
        type: "object",
        description:
          "The level of validation to return from the API. If no values are provided, the default would return `WARNING` and `ERROR` level validation results.",
        properties: {
          levels: {
            type: "array",
            items: {
              type: "string",
              enum: ["WARNING", "ERROR"],
            },
          },
        },
      },
    },
    required: ["payload"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/workflows/create/validation",
    body: ["payload", "validationOptions"],
  },
});
