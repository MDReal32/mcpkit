import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentGetRestrictionsForOperation = defineTool({
  name: "cloud_v1:content:get_restrictions_for_operation",
  description:
    "[Cloud v1] Get restrictions for operation. Returns the restictions on a piece of content for a given operation (read or update).",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the content to be queried for its restrictions.",
      },
      operationKey: {
        type: "string",
        enum: ["read", "update"],
        description: "The operation type of the restrictions to be returned.",
      },
      expand: {
        type: "string",
        description:
          "A multi-value parameter indicating which properties of the content restrictions to expand. (comma-separated)",
      },
      start: {
        type: "integer",
        description: "The starting index of the users and groups in the returned restrictions.",
      },
      limit: {
        type: "integer",
        description:
          "The maximum number of users and the maximum number of groups, in the returned restrictions, to return per page. Note, this may be restricted by fixed system limits.",
      },
    },
    required: ["id", "operationKey"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/content/{id}/restriction/byOperation/{operationKey}",
    query: ["expand", "start", "limit"],
  },
});
