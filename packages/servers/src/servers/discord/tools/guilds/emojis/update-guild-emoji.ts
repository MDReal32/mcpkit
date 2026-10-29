import { defineTool } from "@usemcpkit/core";

export const guildsEmojisUpdateGuildEmoji = defineTool({
  name: "guilds:emojis:update_guild_emoji",
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
      name: {
        type: "string",
      },
      roles: {
        type: "array",
        items: {},
      },
    },
    required: ["guild_id", "emoji_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/emojis/{emoji_id}",
    body: ["name", "roles"],
  },
});
