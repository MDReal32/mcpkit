import { defineTool } from "@usemcpkit/core";

export const channelsPinsDeprecatedCreatePin = defineTool({
  name: "channels:pins:deprecated_create_pin",
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
    method: "PUT",
    path: "/channels/{channel_id}/pins/{message_id}",
  },
});
