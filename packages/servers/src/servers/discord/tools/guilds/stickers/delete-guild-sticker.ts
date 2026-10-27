import { defineTool } from "@usemcpkit/core";

export const guildsStickersDeleteGuildSticker = defineTool({
  name: "guilds:stickers:delete_guild_sticker",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      sticker_id: {
        type: "string",
      },
    },
    required: ["guild_id", "sticker_id"],
  },
  request: {
    method: "DELETE",
    path: "/guilds/{guild_id}/stickers/{sticker_id}",
  },
});
