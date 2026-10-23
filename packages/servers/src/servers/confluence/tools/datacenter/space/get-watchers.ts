import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceGetWatchers = defineTool({
  name: "datacenter:space:get_watchers",
  description:
    "[Data Center] Fetch users watching space. Returns a paginated list of users watching the given Space identified by spaceKey. Only a Confluence Administrator or Space Administrator can perform this action.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
      start: {
        type: "integer",
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/space/{spaceKey}/watchers",
    query: ["limit", "start"],
  },
});
