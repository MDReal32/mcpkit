import { defineTool } from "@usemcpkit/core";

export const datacenterContentGetDescendant = defineTool({
  name: "datacenter:content:get_descendant",
  description:
    "[Data Center] Get Descendants. Returns a map of the descendants of a piece of Content. Content can have multiple types of descendants - for example a Page can have descendants that are also Pages, but it can also have Comments and Attachments.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      expand: {
        type: "string",
        description: "a comma separated list of properties to expand on the descendants.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/content/{id}/descendant",
    query: ["expand"],
  },
});
