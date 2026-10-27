import { defineTool } from "@usemcpkit/core";

export const guildsEmojisDeleteGuildEmoji = defineTool({
  name: "guilds:emojis:delete_guild_emoji",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      emoji_id: {
        type: "string",
      },
    },
    required: ["guild_id", "emoji_id"],
  },
  request: {
    method: "DELETE",
    path: "/guilds/{guild_id}/emojis/{emoji_id}",
  },
});
