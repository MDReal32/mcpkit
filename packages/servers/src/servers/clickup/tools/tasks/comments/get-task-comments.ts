import { defineTool } from "@usemcpkit/core";

export const tasksCommentsGetTaskComments = defineTool({
  name: "tasks:comments:get_task_comments",
  description:
    "Get Task Comments. View task comments. \\ \\ Retrieve comments from a task. Results are returned in reverse chronological order (newest to oldest). By default, the request returns the 25 most recent comments.\\ \\ Pagination: To fetch the next page of history (older comments), you must use the `start` and `start_id` parameters together, using the data from the last comment of the current response.",
  input: {
    type: "object",
    properties: {
      task_id: {
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
      start: {
        type: "integer",
        description:
          "The Unix timestamp (in milliseconds) of the reference comment. Required for pagination. Must be used in combination with `start_id`. \\ Value should be the `date` of the last comment from the previous response.",
      },
      start_id: {
        type: "string",
        description:
          "The unique ID of the reference comment. Required for pagination. Must be used in combination with `start`. \\ Value should be the `id` of the last comment from the previous response.",
      },
    },
    required: ["task_id"],
  },
  request: {
    method: "GET",
    path: "/v2/task/{task_id}/comment",
    query: ["custom_task_ids", "team_id", "start", "start_id"],
  },
});
