import { defineTool } from "@usemcpkit/core";

export const channelsPinsDeprecatedDeletePin = defineTool({
  name: "channels:pins:deprecated_delete_pin",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      message_id: {
        type: "string",
      },
    },
    required: ["channel_id", "message_id"],
  },
  request: {
    method: "DELETE",
    path: "/channels/{channel_id}/pins/{message_id}",
  },
});
