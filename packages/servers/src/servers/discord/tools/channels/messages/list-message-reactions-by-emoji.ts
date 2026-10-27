import { defineTool } from "@usemcpkit/core";

export const channelsMessagesListMessageReactionsByEmoji = defineTool({
  name: "channels:messages:list_message_reactions_by_emoji",
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
      after: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
      type: {
        type: "integer",
      },
    },
    required: ["channel_id", "message_id", "emoji_name"],
  },
  request: {
    method: "GET",
    path: "/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}",
    query: ["after", "limit", "type"],
  },
});
