import { defineTool } from "@usemcpkit/core";

export const channelsMessagesDeleteMessage = defineTool({
  name: "channels:messages:delete_message",
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
    path: "/channels/{channel_id}/messages/{message_id}",
  },
});
