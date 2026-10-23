import { defineTool } from "@usemcpkit/core";

export const datacenterContentGetWatchers = defineTool({
  name: "datacenter:content:get_watchers",
  description:
    "[Data Center] Fetch users watching a given content. Returns a paginated list of Users watching the given Content identified by contentId. Only a Confluence Administrator or Space Administrator can perform this action.",
  input: {
    type: "object",
    properties: {
      contentId: {
        type: "string",
      },
      limit: {
        type: "integer",
        description: "The limit of the number of users to return, this may be restricted by fixed system limit.",
      },
      start: {
        type: "integer",
        description: "The start point of the collection to return.",
      },
    },
    required: ["contentId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/content/{contentId}/watchers",
    query: ["limit", "start"],
  },
});
