import { defineTool } from "@usemcpkit/core";

export const datacenterContentGetProperty = defineTool({
  name: "datacenter:content:get_property",
  description:
    "[Data Center] Find all content properties. Returns a paginated list of content properties. Example request URI(s):",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      expand: {
        type: "string",
        description:
          "a comma separated list of properties to expand on the content properties. Default value: <code>version</code>.",
      },
      limit: {
        type: "integer",
        description: "the limit of the number of labels to return, this may be restricted by fixed system limits",
      },
      start: {
        type: "integer",
        description: "the start point of the collection to return.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/content/{id}/property",
    query: ["expand", "limit", "start"],
  },
});
