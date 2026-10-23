import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsValidateUpdateWorkflows = defineTool({
  name: "workflows:workflows:validate_update_workflows",
  description: "Validate update workflows. Validate the payload for bulk update workflows.",
  input: {
    type: "object",
    properties: {
      payload: {
        type: "object",
        description: "The update workflows payload.",
        properties: {
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
            description: "The details of the workflows to update.",
            items: {
              type: "object",
              description: "The details of the workflows to update.",
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
    path: "/rest/api/2/workflows/update/validation",
    body: ["payload", "validationOptions"],
  },
});
