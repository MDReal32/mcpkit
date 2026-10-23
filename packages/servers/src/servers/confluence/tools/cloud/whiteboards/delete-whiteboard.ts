import { defineTool } from "@usemcpkit/core";

export const cloudWhiteboardsDeleteWhiteboard = defineTool({
  name: "cloud:whiteboards:delete_whiteboard",
  description: "[Cloud] Delete whiteboard. Delete a whiteboard by id.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the whiteboard to be deleted.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/whiteboards/{id}",
  },
});
