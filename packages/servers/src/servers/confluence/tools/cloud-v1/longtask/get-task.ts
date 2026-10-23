import { defineTool } from "@usemcpkit/core";

export const cloudV1LongtaskGetTask = defineTool({
  name: "cloud_v1:longtask:get_task",
  description:
    "[Cloud v1] Get long-running task. Returns information about an active long-running task (e.g. space export), such as how long it has been running and the percentage of the task that has completed.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the task.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/longtask/{id}",
  },
});
