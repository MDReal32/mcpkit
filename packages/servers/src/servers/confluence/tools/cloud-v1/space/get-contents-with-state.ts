import { defineTool } from "@usemcpkit/core";

export const cloudV1SpaceGetContentsWithState = defineTool({
  name: "cloud_v1:space:get_contents_with_state",
  description:
    "[Cloud v1] Get content in space with given content state. Returns all content that has the provided content state in a space.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space to be queried for its content state settings.",
      },
      state_id: {
        type: "integer",
        description: "The id of the content state to filter content by",
      },
      expand: {
        type: "string",
        description:
          "A multi-value parameter indicating which properties of the content to expand. Options include: space, version, history, children, etc. (comma-separated)",
      },
      limit: {
        type: "integer",
        description: "Maximum number of results to return",
      },
      start: {
        type: "integer",
        description: "Number of result to start returning. (0 indexed)",
      },
    },
    required: ["spaceKey", "state_id"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/space/{spaceKey}/state/content",
    query: {
      "state-id": "state_id",
      expand: "expand",
      limit: "limit",
      start: "start",
    },
    commaQuery: ["expand"],
  },
});
