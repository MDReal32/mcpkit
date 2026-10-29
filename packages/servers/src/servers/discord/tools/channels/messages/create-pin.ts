import { defineTool } from "@usemcpkit/core";

export const channelsMessagesCreatePin = defineTool({
  name: "channels:messages:create_pin",
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
    path: "/channels/{channel_id}/messages/pins/{message_id}",
  },
});
