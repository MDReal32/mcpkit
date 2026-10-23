import { defineTool } from "@usemcpkit/core";

export const cloudWhiteboardsGetWhiteboardClassificationLevel = defineTool({
  name: "cloud:whiteboards:get_whiteboard_classification_level",
  description:
    "[Cloud] Get whiteboard classification level. Returns the classification level for a specific whiteboard.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the whiteboard for which classification level should be returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/whiteboards/{id}/classification-level",
  },
});
