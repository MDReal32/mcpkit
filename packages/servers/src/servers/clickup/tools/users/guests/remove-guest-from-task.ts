import { defineTool } from "@usemcpkit/core";

export const usersGuestsRemoveGuestFromTask = defineTool({
  name: "users:guests:remove_guest_from_task",
  description:
    "Remove Guest From Task. Revoke a guest's access to a task. \\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
      },
      guest_id: {
        type: "number",
      },
      include_shared: {
        type: "boolean",
        description:
          "Exclude details of items shared with the guest by setting this parameter to `false`. By default this parameter is set to `true`.",
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
    required: ["task_id", "guest_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/task/{task_id}/guest/{guest_id}",
    query: ["include_shared", "custom_task_ids", "team_id"],
  },
});
