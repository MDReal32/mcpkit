import { defineTool } from "@usemcpkit/core";

export const guildsStickersUpdateGuildSticker = defineTool({
  name: "guilds:stickers:update_guild_sticker",
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
      name: {
        type: "string",
      },
      tags: {
        type: "string",
      },
      description: {
        type: "string",
      },
    },
    required: ["guild_id", "sticker_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/stickers/{sticker_id}",
    body: ["name", "tags", "description"],
  },
});
