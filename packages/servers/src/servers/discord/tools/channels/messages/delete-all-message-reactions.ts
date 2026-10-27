import { defineTool } from "@usemcpkit/core";

export const channelsMessagesDeleteAllMessageReactions = defineTool({
  name: "channels:messages:delete_all_message_reactions",
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
    path: "/channels/{channel_id}/messages/{message_id}/reactions",
  },
});
