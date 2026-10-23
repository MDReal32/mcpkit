import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentGetRestrictionsByOperation = defineTool({
  name: "cloud_v1:content:get_restrictions_by_operation",
  description:
    "[Cloud v1] Get restrictions by operation. Returns restrictions on a piece of content by operation. This method is similar to Get restrictions except that the operations are properties of the return object, rather than items in a results array.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the content to be queried for its restrictions.",
      },
      expand: {
        type: "string",
        description:
          "A multi-value parameter indicating which properties of the content restrictions to expand. (comma-separated)",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/content/{id}/restriction/byOperation",
    query: ["expand"],
  },
});
