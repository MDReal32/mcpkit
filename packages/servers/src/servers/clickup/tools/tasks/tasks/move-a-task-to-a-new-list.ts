import { defineTool } from "@usemcpkit/core";

export const tasksTasksMoveATaskToANewList = defineTool({
  name: "tasks:tasks:move_a_task_to_a_new_list",
  description:
    "Move a task to a new List. Move a task to a new List. For Tasks in Multiple Lists, this endpoint only moves the task to a new home List.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "integer",
        description: "The ID of the Workspace.",
      },
      task_id: {
        type: "string",
        description: "The ID of the requested Task.",
      },
      list_id: {
        type: "string",
        description: "The ID of the List to move the task to.",
      },
      move_custom_fields: {
        type: "boolean",
        description: "Add Custom Fields from the current List to the new List.",
      },
      custom_fields_to_move: {
        type: "array",
        description:
          "An array of Custom Fields IDs to move. This parameter is not required to move all Custom Fields to the new List.",
        items: {
          type: "string",
        },
      },
      status_mappings: {
        type: "array",
        description:
          "Map the current List statuses to the statuses in the new List. You only need to include the ID of the task's current status and the ID of it's new status.",
        items: {
          type: "object",
          properties: {
            source_status_id: {
              type: "string",
              description: "The ID of a status from the task's current List.",
            },
            destination_status_id: {
              type: "string",
              description: "The ID of the respective status in the new List.",
            },
          },
          required: ["source_status_id", "destination_status_id"],
        },
      },
    },
    required: ["workspace_id", "task_id", "list_id"],
  },
  request: {
    method: "PUT",
    path: "/v3/workspaces/{workspace_id}/tasks/{task_id}/home_list/{list_id}",
    body: ["move_custom_fields", "custom_fields_to_move", "status_mappings"],
  },
});
