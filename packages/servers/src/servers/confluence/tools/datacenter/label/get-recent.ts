import { defineTool } from "@usemcpkit/core";

export const datacenterLabelGetRecent = defineTool({
  name: "datacenter:label:get_recent",
  description:
    "[Data Center] Get recently used labels. Returns a paginated list of recently used labels within a Confluence instance. Labels are sorted from the most to the least recently used. Only global labels are considered in this list.",
  input: {
    type: "object",
    properties: {
      limit: {
        type: "integer",
        description: "the limit of the number of labels to return, this may be restricted by fixed system limits",
      },
      start: {
        type: "integer",
        description: "the start point of the collection to return.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/label/recent",
    query: ["limit", "start"],
  },
});
