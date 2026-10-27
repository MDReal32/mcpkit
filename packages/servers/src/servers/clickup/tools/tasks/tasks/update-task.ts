import { defineTool } from "@usemcpkit/core";

export const tasksTasksUpdateTask = defineTool({
  name: "tasks:tasks:update_task",
  description: "Update Task. Update a task by including one or more fields in the request body.",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
      },
      custom_task_ids: {
        type: "boolean",
        description: "If you want to reference a task by its custom task id, this value must be `true`.",
      },
      team_id: {
        type: "number",
        description:
          "When the `custom_task_ids` parameter is set to `true`, the Workspace ID must be provided using the `team_id` parameter. \\ For example: `custom_task_ids=true&team_id=123`.",
      },
      custom_item_id: {
        type: "number",
        description:
          'The custom task type ID for this task. A value of `0` (default) sets the task type to type "Task".\\ \\ Changing the task type affects which Custom Fields appear on subsequent Get Task responses.\\ \\ To get a list of available custom task type IDs for your Workspace, use the Get Custom Task Types endpoint.',
      },
      name: {
        type: "string",
      },
      description: {
        type: "string",
        description: 'To clear the task description, include `Description` with `" "`.',
      },
      markdown_content: {
        type: "string",
        description:
          "Markdown formatted description for the task. If both `markdown_content` and `description` are provided, `markdown_content` will be used instead of `description`.",
      },
      status: {
        type: "string",
      },
      priority: {
        type: "integer",
      },
      due_date: {
        type: "integer",
      },
      due_date_time: {
        type: "boolean",
      },
      parent: {
        type: "string",
        description:
          'You can move a subtask to another parent task by including `"parent"` with a valid `task id`.\\ \\ You cannot convert a subtask to a task by setting `"parent"` to `null`.',
      },
      time_estimate: {
        type: "integer",
      },
      start_date: {
        type: "integer",
      },
      start_date_time: {
        type: "boolean",
      },
      points: {
        type: "number",
        description: "Update the task's Sprint Points.",
      },
      assignees: {
        type: "object",
        properties: {
          add: {
            type: "array",
            items: {
              type: "integer",
            },
          },
          rem: {
            type: "array",
            items: {
              type: "integer",
            },
          },
        },
        required: ["add", "rem"],
      },
      group_assignees: {
        type: "object",
        properties: {
          add: {
            type: "array",
            items: {
              type: "string",
            },
          },
          rem: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      watchers: {
        type: "object",
        properties: {
          add: {
            type: "array",
            items: {
              type: "integer",
            },
          },
          rem: {
            type: "array",
            items: {
              type: "integer",
            },
          },
        },
        required: ["add", "rem"],
      },
      archived: {
        type: "boolean",
      },
    },
    required: ["task_id"],
  },
  request: {
    method: "PUT",
    path: "/v2/task/{task_id}",
    query: ["custom_task_ids", "team_id"],
    body: [
      "custom_item_id",
      "name",
      "description",
      "markdown_content",
      "status",
      "priority",
      "due_date",
      "due_date_time",
      "parent",
      "time_estimate",
      "start_date",
      "start_date_time",
      "points",
      "assignees",
      "group_assignees",
      "watchers",
      "archived",
    ],
  },
});
