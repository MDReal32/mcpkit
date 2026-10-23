import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentGetDescendantsOfType = defineTool({
  name: "cloud_v1:content:get_descendants_of_type",
  description:
    "[Cloud v1] [Deprecated] Get content descendants by type. Returns all descendants of a given type, for a piece of content. This is similar to Get content children by type, except that this method returns child pages at all levels, rather than just the direct child pages.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the content to be queried for its descendants.",
      },
      type: {
        type: "string",
        enum: ["page", "comment", "attachment"],
        description: "The type of descendants to return.",
      },
      depth: {
        type: "string",
        enum: ["all", "root", "<any positive integer argument in the range of 1 and 100>"],
        description:
          "Filter the results to descendants upto a desired level of the content. Note, the maximum value supported is 100. root level of the content means immediate (level 1) descendants of the type requested. all represents returning all descendants of the type requested.",
      },
      expand: {
        type: "string",
        description: "A multi-value parameter indicating which properties of the content to expand. (comma-separated)",
      },
      start: {
        type: "integer",
        description: "The starting index of the returned content.",
      },
      limit: {
        type: "integer",
        description:
          "The maximum number of content to return per page. Note, this may be restricted by fixed system limits.",
      },
    },
    required: ["id", "type"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/content/{id}/descendant/{type}",
    query: ["depth", "expand", "start", "limit"],
    commaQuery: ["expand"],
  },
});
