import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceGetContentByType = defineTool({
  name: "datacenter:space:get_content_by_type",
  description: "[Data Center] Get contents by type. Returns the content in this given space with the given type.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "the key of the space to update.",
      },
      type: {
        type: "string",
        description: "the type of content to return with the space. Valid values: <code>page, blogpost</code>.",
      },
      expand: {
        type: "string",
        description: "a comma separated list of properties to expand on the space.",
      },
      depth: {
        type: "string",
        description:
          "a string indicating if all content, or just the root content of the space is returned. Default value: <code>all</code>. Valid values: <code>all, root</code>.",
      },
      limit: {
        type: "integer",
        description: "the limit of the number of labels to return, this may be restricted by fixed system limits.",
      },
      start: {
        type: "integer",
        description: "he start point of the collection to return.",
      },
    },
    required: ["spaceKey", "type"],
  },
  request: {
    method: "GET",
    path: "/rest/api/space/{spaceKey}/content/{type}",
    query: ["expand", "depth", "limit", "start"],
  },
});
