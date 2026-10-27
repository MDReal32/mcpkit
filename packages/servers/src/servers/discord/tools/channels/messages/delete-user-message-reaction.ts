import { defineTool } from "@usemcpkit/core";

export const channelsMessagesDeleteUserMessageReaction = defineTool({
  name: "channels:messages:delete_user_message_reaction",
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
      user_id: {
        type: "string",
      },
    },
    required: ["channel_id", "message_id", "emoji_name", "user_id"],
  },
  request: {
    method: "DELETE",
    path: "/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}",
  },
});
