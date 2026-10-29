import { defineTool } from "@usemcpkit/core";

export const tasksCustomFieldsRemoveCustomFieldValue = defineTool({
  name: "tasks:custom_fields:remove_custom_field_value",
  description:
    "Remove Custom Field Value. Remove the data from a Custom Field on a task. This does not delete the option from the Custom Field.",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
      },
      field_id: {
        type: "string",
        description: "b8a8-48d8-a0c6-b4200788a683 (uuid)",
      },
      custom_task_ids: {
        type: "boolean",
        description: "If you want to reference a task by it's custom task id, this value must be `true`.",
      },
      team_id: {
        type: "number",
        description:
          "When the `custom_task_ids` parameter is set to `true`, the Workspace ID must be provided using the `team_id` parameter. \\ For example: `custom_task_ids=true&team_id=123`.",
      },
    },
    required: ["task_id", "field_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/task/{task_id}/field/{field_id}",
    query: ["custom_task_ids", "team_id"],
  },
});
