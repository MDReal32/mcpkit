import { defineTool } from "@usemcpkit/core";

export const tasksTagsRemoveTagFromTask = defineTool({
  name: "tasks:tags:remove_tag_from_task",
  description: "Remove Tag From Task. Remove a Tag from a task. This does not delete the Tag from the Space.",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
      },
      tag_name: {
        type: "string",
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
    required: ["task_id", "tag_name"],
  },
  request: {
    method: "DELETE",
    path: "/v2/task/{task_id}/tag/{tag_name}",
    query: ["custom_task_ids", "team_id"],
  },
});
