import { defineTool } from "@usemcpkit/core";

export const hierarchySpacesUpdateSpace = defineTool({
  name: "hierarchy:spaces:update_space",
  description: "Update Space. Rename, set the Space color, and enable ClickApps for a Space.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "number",
      },
      name: {
        type: "string",
      },
      color: {
        type: "string",
      },
      private: {
        type: "boolean",
      },
      admin_can_manage: {
        type: "boolean",
        description:
          '***Note:** Allowing or restricting admins from managing private Spaces using `"admin_can_manage"` is an Enterprise Plan feature.*',
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
    required: ["space_id", "name", "color", "private", "admin_can_manage", "multiple_assignees", "features"],
  },
  request: {
    method: "PUT",
    path: "/v2/space/{space_id}",
    body: ["name", "color", "private", "admin_can_manage", "multiple_assignees", "features"],
  },
});
