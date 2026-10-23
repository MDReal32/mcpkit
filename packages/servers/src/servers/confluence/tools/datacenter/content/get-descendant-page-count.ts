import { defineTool } from "@usemcpkit/core";

export const datacenterContentGetDescendantPageCount = defineTool({
  name: "datacenter:content:get_descendant_page_count",
  description:
    "[Data Center] Get descendant page count. Returns the count of descendant pages for a piece of Content. Only pages with 'current' status are counted. The content itself is not included in the count.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/content/{id}/descendant/page/count",
  },
});
