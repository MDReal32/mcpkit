import { defineTool } from "@usemcpkit/core";

export const tasksTaskRelationshipsDeleteDependency = defineTool({
  name: "tasks:task_relationships:delete_dependency",
  description: "Delete Dependency. Remove the dependency relationship between two or more tasks.",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
      },
      depends_on: {
        type: "string",
      },
      dependency_of: {
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
    required: ["task_id", "depends_on", "dependency_of"],
  },
  request: {
    method: "DELETE",
    path: "/v2/task/{task_id}/dependency",
    query: ["depends_on", "dependency_of", "custom_task_ids", "team_id"],
  },
});
