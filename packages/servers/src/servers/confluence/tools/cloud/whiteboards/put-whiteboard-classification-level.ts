import { defineTool } from "@usemcpkit/core";

export const cloudWhiteboardsPutWhiteboardClassificationLevel = defineTool({
  name: "cloud:whiteboards:put_whiteboard_classification_level",
  description:
    "[Cloud] Update whiteboard classification level. Updates the classification level for a specific whiteboard.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the whiteboard for which classification level should be updated.",
      },
      body_id: {
        type: "string",
        description: "The ID of the classification level.",
      },
      status: {
        type: "string",
        description: "Status of the content.",
        enum: ["current"],
      },
    },
    required: ["id", "body_id", "status"],
  },
  request: {
    method: "PUT",
    path: "/wiki/api/v2/whiteboards/{id}/classification-level",
    body: {
      id: "body_id",
      status: "status",
    },
  },
});
