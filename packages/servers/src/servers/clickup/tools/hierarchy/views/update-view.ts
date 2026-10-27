import { defineTool } from "@usemcpkit/core";

export const hierarchyViewsUpdateView = defineTool({
  name: "hierarchy:views:update_view",
  description: "Update View. Rename a view, update the grouping, sorting, filters, columns, and settings of a view.",
  input: {
    type: "object",
    properties: {
      view_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      type: {
        type: "string",
      },
      parent: {
        type: "object",
        description:
          "The parent parameter specifies where the view is located in the ClickUp Hierarchy. Both `id` and `type` are required. \\ \\ The `id` is the id of the Workspace, Space, Folder, or List where the view is located. \\ \\ The `type` value indciates the level of the Hierarchy where the view is located.",
        properties: {
          id: {
            type: "string",
            description: "The id of the Workspace, Space, Folder, or List where the view is located.",
          },
          type: {
            type: "integer",
            description:
              "The level of the Hierarchy where the view is created. \\ \\ Options include: \\ \\ Workspace (Everything Level): `7` \\ \\ Space: `4` \\ \\ Folder: `5` \\ \\ List: `6`",
          },
        },
        required: ["id", "type"],
      },
      grouping: {
        type: "object",
        properties: {
          field: {
            type: "string",
            description:
              "Set the field to group by.\\ \\ Options include: `none`, `status`, `priority`, `assignee`, `tag`, or `dueDate`.",
          },
          dir: {
            type: "integer",
            description:
              "Set a group sort order using `1` or `-1`.\\ \\ For example, use `1`show tasks with urgent priority at the top of your view, and tasks with no priority at the bottom.\\ \\ Use `-1` to reverse the order to show tasks with no priority at the top of your view.",
          },
          collapsed: {
            type: "array",
            items: {
              type: "string",
            },
          },
          ignore: {
            type: "boolean",
          },
        },
        required: ["field", "dir", "collapsed", "ignore"],
      },
      divide: {
        type: "object",
        properties: {
          field: {},
          dir: {},
          collapsed: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: ["collapsed"],
      },
      sorting: {
        type: "object",
        properties: {
          fields: {
            type: "array",
            description:
              "Include an array of fields to sort by.\\ \\ You can sort by the same fields available when filtering a view.",
            items: {
              type: "string",
            },
          },
        },
        required: ["fields"],
      },
      filters: {
        type: "object",
        properties: {
          op: {
            type: "string",
            description: "The available operator (`op``) values are `AND`` and `OR``.",
          },
          fields: {
            type: "array",
            description: "View the list of fields available to filter by.",
            items: {
              type: "string",
            },
          },
          search: {
            type: "string",
          },
          show_closed: {
            type: "boolean",
          },
        },
        required: ["op", "fields", "search", "show_closed"],
      },
      columns: {
        type: "object",
        description:
          "Custom Fields added to a view at the Everything level will be added to all tasks in your Workspace. Once Custom Fields are added to one of these views, you cannot move it to another level of the Hierarchy.",
        properties: {
          fields: {
            type: "array",
            description:
              "Custom Fields require the `cf_` prefix and must be formatted as a JSON object. Example: `cf_eb1234567890-c676-4c10-9012-345678901234`",
            items: {
              type: "string",
            },
          },
        },
        required: ["fields"],
      },
      team_sidebar: {
        type: "object",
        properties: {
          assignees: {
            type: "array",
            items: {
              type: "string",
            },
          },
          assigned_comments: {
            type: "boolean",
          },
          unassigned_tasks: {
            type: "boolean",
          },
        },
        required: ["assignees", "assigned_comments", "unassigned_tasks"],
      },
      settings: {
        type: "object",
        properties: {
          show_task_locations: {
            type: "boolean",
          },
          show_subtasks: {
            type: "integer",
            description:
              "Acceptable values are `1`, `2`, or `3`, which show subtasks separate, expanded, or collapsed.",
          },
          show_subtask_parent_names: {
            type: "boolean",
          },
          show_closed_subtasks: {
            type: "boolean",
          },
          show_assignees: {
            type: "boolean",
          },
          show_images: {
            type: "boolean",
          },
          collapse_empty_columns: {
            type: "string",
          },
          me_comments: {
            type: "boolean",
          },
          me_subtasks: {
            type: "boolean",
          },
          me_checklists: {
            type: "boolean",
          },
        },
        required: [
          "show_task_locations",
          "show_subtasks",
          "show_subtask_parent_names",
          "show_closed_subtasks",
          "show_assignees",
          "show_images",
          "collapse_empty_columns",
          "me_comments",
          "me_subtasks",
          "me_checklists",
        ],
      },
    },
    required: [
      "view_id",
      "name",
      "type",
      "parent",
      "grouping",
      "divide",
      "sorting",
      "filters",
      "columns",
      "team_sidebar",
      "settings",
    ],
  },
  request: {
    method: "PUT",
    path: "/v2/view/{view_id}",
    body: ["name", "type", "parent", "grouping", "divide", "sorting", "filters", "columns", "team_sidebar", "settings"],
  },
});
