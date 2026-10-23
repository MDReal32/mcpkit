import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentUpdateRestrictions = defineTool({
  name: "cloud_v1:content:update_restrictions",
  description:
    "[Cloud v1] Update restrictions. Updates restrictions for a piece of content. This removes the existing restrictions and replaces them with the restrictions in the request.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the content to update restrictions for.",
      },
      expand: {
        type: "string",
        description:
          "A multi-value parameter indicating which properties of the content restrictions (returned in response) to expand. (comma-separated)",
      },
      results: {
        type: "array",
        items: {
          type: "object",
        },
      },
      start: {
        type: "integer",
      },
      limit: {
        type: "integer",
      },
      size: {
        type: "integer",
      },
      restrictionsHash: {
        type: "string",
        description: "This property is used by the UI to figure out whether a set of restrictions has changed.",
      },
      _links: {
        type: "object",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/wiki/rest/api/content/{id}/restriction",
    query: ["expand"],
    body: ["results", "start", "limit", "size", "restrictionsHash", "_links"],
  },
});
