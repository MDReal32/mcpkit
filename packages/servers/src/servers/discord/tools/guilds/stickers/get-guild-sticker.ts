import { defineTool } from "@usemcpkit/core";

export const guildsStickersGetGuildSticker = defineTool({
  name: "guilds:stickers:get_guild_sticker",
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
    method: "GET",
    path: "/guilds/{guild_id}/stickers/{sticker_id}",
  },
});
