import { defineTool } from "@usemcpkit/core";

export const datacenterLongtaskList = defineTool({
  name: "datacenter:longtask:list",
  description: "[Data Center] Get tasks. Returns information about all tracked long-running tasks.",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        description: "comma separated list of properties to expand on the tasks.",
      },
      limit: {
        type: "integer",
        description: "the limit of the number of items to return, this may be restricted by fixed system limits",
      },
      start: {
        type: "integer",
        description: "the start point of the collection to return.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/longtask",
    query: ["expand", "limit", "start"],
  },
});
