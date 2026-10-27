import { defineTool } from "@usemcpkit/core";

export const guildsEmojisGetGuildEmoji = defineTool({
  name: "guilds:emojis:get_guild_emoji",
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
    method: "GET",
    path: "/guilds/{guild_id}/emojis/{emoji_id}",
  },
});
