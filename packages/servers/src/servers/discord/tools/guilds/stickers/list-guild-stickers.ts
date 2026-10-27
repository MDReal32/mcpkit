import { defineTool } from "@usemcpkit/core";

export const guildsStickersListGuildStickers = defineTool({
  name: "guilds:stickers:list_guild_stickers",
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
    path: "/guilds/{guild_id}/stickers",
  },
});
