import { defineTool } from "@usemcpkit/core";

export const tasksCustomFieldsSetCustomFieldValue = defineTool({
  name: "tasks:custom_fields:set_custom_field_value",
  description:
    "Set Custom Field Value. Add data to a Custom field on a task. \\ \\ You'll need to know the `task_id` of the task you want to update, and the universal unique identifier (UUID) `field_id` of the Custom Field you want to set. \\ \\ The Custom Field must be applicable to the task's current `custom_item_id`. Use Get Custom Fields (check each field's `applied_objects`) or Get Task to find applicable `field_id` values.\\ \\ Return…",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
        description: "Enter the task ID of the task you want to update.",
      },
      field_id: {
        type: "string",
        description: "Enter the universal unique identifier (UUID) of the Custom Field you want to set.",
      },
      custom_task_ids: {
        type: "boolean",
        description: "If you want to reference a task by its Custom Task ID, this value must be `true`.",
      },
      team_id: {
        type: "number",
        description:
          "When the `custom_task_ids` parameter is set to `true`, the Workspace ID must be provided using the `team_id` parameter.",
      },
      value: {
        type: "boolean",
      },
      value_options: {
        type: "object",
        properties: {
          time: {
            type: "boolean",
          },
        },
        required: ["time"],
      },
    },
    required: ["task_id", "field_id"],
  },
  request: {
    method: "POST",
    path: "/v2/task/{task_id}/field/{field_id}",
    query: ["custom_task_ids", "team_id"],
    body: ["value", "value_options"],
  },
});
