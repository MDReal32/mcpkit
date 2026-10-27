import { defineTool } from "@usemcpkit/core";

export const tasksTaskRelationshipsDeleteTaskLink = defineTool({
  name: "tasks:task_relationships:delete_task_link",
  description: "Delete Task Link. Remove the link between two tasks.",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
      },
      links_to: {
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
    required: ["task_id", "links_to"],
  },
  request: {
    method: "DELETE",
    path: "/v2/task/{task_id}/link/{links_to}",
    query: ["custom_task_ids", "team_id"],
  },
});
