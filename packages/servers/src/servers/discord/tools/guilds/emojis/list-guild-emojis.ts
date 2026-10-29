import { defineTool } from "@usemcpkit/core";

export const guildsEmojisListGuildEmojis = defineTool({
  name: "guilds:emojis:list_guild_emojis",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/emojis",
  },
});
