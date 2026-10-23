import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentGetContentDescendants = defineTool({
  name: "cloud_v1:content:get_content_descendants",
  description:
    "[Cloud v1] [Deprecated] Get content descendants. Returns a map of the descendants of a piece of content. This is similar to Get content children, except that this method returns child pages at all levels, rather than just the direct child pages.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the content to be queried for its descendants.",
      },
      expand: {
        type: "string",
        description:
          "A multi-value parameter indicating which properties of the children to expand, where: (comma-separated)",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/content/{id}/descendant",
    query: ["expand"],
  },
});
