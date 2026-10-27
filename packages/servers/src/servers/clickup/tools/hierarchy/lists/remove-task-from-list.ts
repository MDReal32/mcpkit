import { defineTool } from "@usemcpkit/core";

export const hierarchyListsRemoveTaskFromList = defineTool({
  name: "hierarchy:lists:remove_task_from_list",
  description:
    "Remove Task From List. Remove a task from an additional List. You can't remove a task from its home List. \\ \\ ***Note:** This endpoint requires the Tasks in Multiple List ClickApp to be enabled.*",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "number",
      },
      task_id: {
        type: "string",
      },
    },
    required: ["list_id", "task_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/list/{list_id}/task/{task_id}",
  },
});
