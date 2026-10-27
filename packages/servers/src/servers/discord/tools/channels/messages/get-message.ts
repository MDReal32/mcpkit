import { defineTool } from "@usemcpkit/core";

export const channelsMessagesGetMessage = defineTool({
  name: "channels:messages:get_message",
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
    method: "GET",
    path: "/channels/{channel_id}/messages/{message_id}",
  },
});
