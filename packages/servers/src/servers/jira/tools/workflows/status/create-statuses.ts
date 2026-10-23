import { defineTool } from "@usemcpkit/core";

export const workflowsStatusCreateStatuses = defineTool({
  name: "workflows:status:create_statuses",
  description: "Bulk create statuses. Creates statuses for a global or project scope.",
  input: {
    type: "object",
    properties: {
      scope: {
        type: "object",
        description: "The scope of the status.",
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
              "The scope of the status. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects.",
            enum: ["PROJECT", "GLOBAL"],
          },
        },
        required: ["type"],
      },
      statuses: {
        type: "array",
        description: "Details of the statuses being created.",
        items: {
          type: "object",
          description: "Details of the status being created.",
          properties: {
            description: {
              type: "string",
              description: "The description of the status.",
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
          },
          required: ["name", "statusCategory"],
        },
      },
    },
    required: ["scope", "statuses"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/statuses",
    body: ["scope", "statuses"],
  },
});
