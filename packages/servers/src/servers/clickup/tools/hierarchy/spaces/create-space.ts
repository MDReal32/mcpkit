import { defineTool } from "@usemcpkit/core";

export const hierarchySpacesCreateSpace = defineTool({
  name: "hierarchy:spaces:create_space",
  description: "Create Space. Add a new Space to a Workspace.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      name: {
        type: "string",
      },
      multiple_assignees: {
        type: "boolean",
      },
      features: {
        type: "object",
        properties: {
          due_dates: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
              start_date: {
                type: "boolean",
              },
              remap_due_dates: {
                type: "boolean",
              },
              remap_closed_due_date: {
                type: "boolean",
              },
            },
            required: ["enabled", "start_date", "remap_due_dates", "remap_closed_due_date"],
          },
          time_tracking: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            required: ["enabled"],
          },
          tags: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            required: ["enabled"],
          },
          time_estimates: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            required: ["enabled"],
          },
          checklists: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            required: ["enabled"],
          },
          custom_fields: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            required: ["enabled"],
          },
          remap_dependencies: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            required: ["enabled"],
          },
          dependency_warning: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            required: ["enabled"],
          },
          portfolios: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
            },
            required: ["enabled"],
          },
        },
        required: [
          "due_dates",
          "time_tracking",
          "tags",
          "time_estimates",
          "checklists",
          "custom_fields",
          "remap_dependencies",
          "dependency_warning",
          "portfolios",
        ],
      },
    },
    required: ["team_id", "name", "multiple_assignees", "features"],
  },
  request: {
    method: "POST",
    path: "/v2/team/{team_id}/space",
    body: ["name", "multiple_assignees", "features"],
  },
});
