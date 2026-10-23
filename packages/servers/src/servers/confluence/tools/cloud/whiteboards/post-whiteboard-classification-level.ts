import { defineTool } from "@usemcpkit/core";

export const cloudWhiteboardsPostWhiteboardClassificationLevel = defineTool({
  name: "cloud:whiteboards:post_whiteboard_classification_level",
  description:
    "[Cloud] Reset whiteboard classification level. Resets the classification level for a specific whiteboard for the space default classification level.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the whiteboard for which classification level should be updated.",
      },
      status: {
        type: "string",
        description: "Status of the content.",
        enum: ["current"],
      },
    },
    required: ["id", "status"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/whiteboards/{id}/classification-level/reset",
    body: ["status"],
  },
});
