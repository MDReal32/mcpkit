import { defineTool } from "@usemcpkit/core";

export const tasksTagsAddTagToTask = defineTool({
  name: "tasks:tags:add_tag_to_task",
  description: "Add Tag To Task. Add a Tag to a task.",
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
    method: "POST",
    path: "/v2/task/{task_id}/tag/{tag_name}",
    query: ["custom_task_ids", "team_id"],
  },
});
