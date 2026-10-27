import { defineTool } from "@usemcpkit/core";

export const tasksTasksGetTask = defineTool({
  name: "tasks:tasks:get_task",
  description:
    "Get Task. View information about a task. You can only view task information of tasks you can access. \\ \\ Tasks with attachments will return an \"attachments\" response. \\ \\ Docs attached to a task are not returned.\\ \\ The `custom_fields` array only includes Custom Fields applicable to the task's `custom_item_id`. Use Get Custom Fields and each field's `applied_objects` to discover which fields apply to which…",
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
      include_subtasks: {
        type: "boolean",
        description: "Include subtasks, default false",
      },
      include_markdown_description: {
        type: "boolean",
        description: "To return task descriptions in Markdown format, use `?include_markdown_description=true`.",
      },
      custom_fields: {
        type: "string",
        description:
          'Include tasks with specific values in one or more Custom Fields. Custom Relationships are included.\\ \\ For example: `?custom_fields=[{"field_id":"abcdefghi12345678","operator":"=","value":"1234"},{"field_id":"jklmnop123456","operator":"<","value":"5"}]`\\ \\ Only set Custom Field values display in the `value` property of the `custom_fields` parameter. If you want to include tasks with specific valu…',
      },
    },
    required: ["task_id"],
  },
  request: {
    method: "GET",
    path: "/v2/task/{task_id}",
    query: ["custom_task_ids", "team_id", "include_subtasks", "include_markdown_description", "custom_fields"],
  },
});
