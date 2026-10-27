import { defineTool } from "@usemcpkit/core";

export const tasksMembersGetTaskMembers = defineTool({
  name: "tasks:members:get_task_members",
  description:
    "Get Task Members. Get Workspace members who have explicit access to a task. Responses do not include people with access through a Team, or people with access from the List, Folder, or Space where the task exists.",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
      },
    },
    required: ["task_id"],
  },
  request: {
    method: "GET",
    path: "/v2/task/{task_id}/member",
  },
});
