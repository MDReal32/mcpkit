import { defineTool } from "@usemcpkit/core";

export const channelsMessagesCrosspostMessage = defineTool({
  name: "channels:messages:crosspost_message",
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
    method: "POST",
    path: "/channels/{channel_id}/messages/{message_id}/crosspost",
  },
});
