import { defineTool } from "@usemcpkit/core";

export const channelsMessagesDeleteMyMessageReaction = defineTool({
  name: "channels:messages:delete_my_message_reaction",
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
      emoji_name: {
        type: "string",
      },
    },
    required: ["channel_id", "message_id", "emoji_name"],
  },
  request: {
    method: "DELETE",
    path: "/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me",
  },
});
