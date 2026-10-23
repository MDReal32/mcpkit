import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentGetRestrictions = defineTool({
  name: "cloud_v1:content:get_restrictions",
  description: "[Cloud v1] Get restrictions. Returns the restrictions on a piece of content.",
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
          "A multi-value parameter indicating which properties of the content restrictions to expand. By default, the following objects are expanded: `restrictions.user`, `restrictions.group`. (comma-separated)",
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
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/content/{id}/restriction",
    query: ["expand", "start", "limit"],
    commaQuery: ["expand"],
  },
});
