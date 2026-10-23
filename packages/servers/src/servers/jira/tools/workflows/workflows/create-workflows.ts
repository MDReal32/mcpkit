import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsCreateWorkflows = defineTool({
  name: "workflows:workflows:create_workflows",
  description: "Bulk create workflows. Create workflows and related statuses.",
  input: {
    type: "object",
    properties: {
      scope: {
        type: "object",
        description: "The scope of the workflow.",
        properties: {
          project: {
            type: "object",
            description: "Project ID details.",
            properties: {
              id: {
                type: "string",
                description: "The ID of the project.",
              },
            },
            required: ["id"],
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
          properties: {
            description: {
              type: "string",
              description: "The description of the status.",
            },
            id: {
              type: "string",
              description: "The ID of the status. When reusing an existing status, this field should be provided.",
            },
            name: {
              type: "string",
              description: "The name of the status.",
            },
            statusCategory: {
              type: "string",
              description: "The category of the status.",
              enum: ["TODO", "IN_PROGRESS", "DONE"],
            },
            statusReference: {
              type: "string",
              description:
                "The reference of the status. If adding a new status to a team-managed workflow, this must be a UUID (for company-managed a UUID is not needed).",
            },
          },
          required: ["name", "statusCategory", "statusReference"],
        },
      },
      workflows: {
        type: "array",
        description: "The details of the workflows to create.",
        items: {
          type: "object",
          description: "The details of the workflows to create.",
          properties: {
            description: {
              type: "string",
              description: "The description of the workflow to create.",
            },
            loopedTransitionContainerLayout: {
              type: "object",
              description: "The starting point for the statuses in the workflow.",
            },
            name: {
              type: "string",
              description: "The name of the workflow to create.",
            },
            startPointLayout: {
              type: "object",
              description: "The starting point for the statuses in the workflow.",
            },
            statuses: {
              type: "array",
              description: "The statuses associated with this workflow.",
              items: {
                type: "object",
                description: "The statuses associated with this workflow.",
              },
            },
            transitions: {
              type: "array",
              description: "The transitions of this workflow.",
              items: {
                type: "object",
                description: "The transition update data.",
              },
            },
          },
          required: ["name", "statuses", "transitions"],
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/workflows/create",
    body: ["scope", "statuses", "workflows"],
  },
});
