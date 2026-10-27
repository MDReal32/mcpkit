import { defineTool } from "@usemcpkit/core";

export const hierarchyListsAddTaskToList = defineTool({
  name: "hierarchy:lists:add_task_to_list",
  description:
    "Add Task To List. Add a task to an additional List. \\ \\ ***Note:** This endpoint requires the Tasks in Multiple List ClickApp to be enabled.*",
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
    method: "POST",
    path: "/v2/list/{list_id}/task/{task_id}",
  },
});
