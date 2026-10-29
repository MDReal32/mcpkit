import { defineTool } from "@usemcpkit/core";

export const tasksTasksCreateTask = defineTool({
  name: "tasks:tasks:create_task",
  description:
    "Create Task. Create a new task.\\ \\ Custom Field values in the request body are only saved when the field is applicable to the task's `custom_item_id`. Use Get Custom Fields and each field's `applied_objects` to determine applicability before creating the task.",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "number",
      },
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
      assignees: {
        type: "array",
        items: {
          type: "integer",
        },
      },
      archived: {
        type: "boolean",
      },
      group_assignees: {
        type: "array",
        description: "Assign multiple user groups to the task.",
        items: {
          type: "string",
        },
      },
      tags: {
        type: "array",
        items: {
          type: "string",
        },
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
        description: "Add Sprint Points to the task.",
      },
      notify_all: {
        type: "boolean",
        description:
          "If `notify_all` is true, the creator of the task will also be notified. Other assignees and watchers are always notified regardless of this setting.",
      },
      parent: {
        type: "string",
        description:
          "You can create a subtask by including an existing task ID.\\ \\ The `parent` task ID you include can be a subtask, but must be in the same List specified in the path parameter.",
      },
      markdown_content: {
        type: "string",
        description:
          "Markdown formatted description for the task. If both `markdown_content` and `description` are provided, `markdown_content` will be used instead of `description`.",
      },
      links_to: {
        type: "string",
        description: "Include a task ID to create a linked dependency with your new task.",
      },
      check_required_custom_fields: {
        type: "boolean",
        description:
          "When creating a task via API any required Custom Fields are ignored by default (`false`).\\ \\ You can enforce required Custom Fields by including `check_required_custom_fields: true`.",
      },
      custom_fields: {
        type: "array",
        description:
          "You can include one or more Custom Fields to set them when creating a new task.\\ \\ Custom Fields that use object and array type values are nullable by sending `\"value\": null`.\\ \\ Only Custom Fields applicable to the task's `custom_item_id` are saved. Values for fields scoped to other custom task types are ignored. Use a Get Custom Fields endpoint and check each field's `applied_objects` to see wh…",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            value: {
              type: "boolean",
            },
            value_options: {
              type: "object",
            },
          },
          required: ["id", "value"],
        },
      },
      custom_item_id: {
        type: "number",
        description:
          'The custom task type ID for this task. A value of `0` (default) creates a standard task type "Task".\\ \\ This determines which Custom Fields from the `custom_fields` array are accepted.\\ \\ To get a list of available custom task type IDs for your Workspace, use the Get Custom Task Types endpoint.',
      },
    },
    required: ["list_id", "name"],
  },
  request: {
    method: "POST",
    path: "/v2/list/{list_id}/task",
    body: [
      "name",
      "description",
      "assignees",
      "archived",
      "group_assignees",
      "tags",
      "status",
      "priority",
      "due_date",
      "due_date_time",
      "time_estimate",
      "start_date",
      "start_date_time",
      "points",
      "notify_all",
      "parent",
      "markdown_content",
      "links_to",
      "check_required_custom_fields",
      "custom_fields",
      "custom_item_id",
    ],
  },
});
