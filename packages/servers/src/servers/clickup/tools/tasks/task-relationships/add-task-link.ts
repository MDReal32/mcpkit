import { defineTool } from "@usemcpkit/core";

export const tasksTaskRelationshipsAddTaskLink = defineTool({
  name: "tasks:task_relationships:add_task_link",
  description:
    "Add Task Link. This is the equivalent of the feature _Task Links_ in the right-hand sidebar of a Task. It allows you to link two tasks together. General links or links to other objects than tasks are not supported.",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
        description: "The task to initiate the link from.",
      },
      links_to: {
        type: "string",
        description: "The task to link to.",
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
    method: "POST",
    path: "/v2/task/{task_id}/link/{links_to}",
    query: ["custom_task_ids", "team_id"],
  },
});
