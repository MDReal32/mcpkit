import { defineTool } from "@usemcpkit/core";

export const tasksTaskRelationshipsAddDependency = defineTool({
  name: "tasks:task_relationships:add_dependency",
  description: "Add Dependency. Set a task as waiting on or blocking another task.",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
        description: "This is the task which is waiting on or blocking another task.",
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
      depends_on: {
        type: "string",
      },
      dependency_of: {
        type: "string",
      },
    },
    required: ["task_id"],
  },
  request: {
    method: "POST",
    path: "/v2/task/{task_id}/dependency",
    query: ["custom_task_ids", "team_id"],
    body: ["depends_on", "dependency_of"],
  },
});
