import { defineTool } from "@usemcpkit/core";

export const channelsMessagesDeletePin = defineTool({
  name: "channels:messages:delete_pin",
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
    path: "/channels/{channel_id}/messages/pins/{message_id}",
  },
});
