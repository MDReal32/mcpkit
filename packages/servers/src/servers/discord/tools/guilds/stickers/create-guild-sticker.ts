import { defineTool } from "@usemcpkit/core";

export const guildsStickersCreateGuildSticker = defineTool({
  name: "guilds:stickers:create_guild_sticker",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
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
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["guild_id", "name", "tags", "file"],
  },
  request: {
    method: "POST",
    path: "/guilds/{guild_id}/stickers",
    body: ["name", "tags", "description", "file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
