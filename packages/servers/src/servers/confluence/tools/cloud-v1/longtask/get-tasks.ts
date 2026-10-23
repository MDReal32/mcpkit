import { defineTool } from "@usemcpkit/core";

export const cloudV1LongtaskGetTasks = defineTool({
  name: "cloud_v1:longtask:get_tasks",
  description:
    "[Cloud v1] Get long-running tasks. Returns information about all active long-running tasks (e.g. space export), such as how long each task has been running and the percentage of each task that has completed.",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description: "The key of the tasks.",
      },
      start: {
        type: "integer",
        description: "The starting index of the returned tasks.",
      },
      limit: {
        type: "integer",
        description:
          "The maximum number of tasks to return per page. Note, this may be restricted by fixed system limits.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/longtask",
    query: ["key", "start", "limit"],
  },
});
